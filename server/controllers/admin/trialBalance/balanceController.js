// controllers/trialBalanceController.js

const SalesEntry = require("../../../models/SalesEntry");
const Payment = require("../../../models/Payment");
const Customer = require("../../../models/Customer");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const Supplier = require("../../../models/Supplier");
const Employee = require("../../../models/Employee");
const Lender = require("../../../models/Lender");
const MonthlyClosure = require("../../../models/MonthlyClosure");

// ========== 1. Receivables from Customers ==========
// done
const getReceivablesFromCustomers = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // format: "YYYY-MM"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // ✅ Filter customers who existed before or during the selected month
    const customers = await Customer.find({
      createdAt: { $lte: endOfMonth },
    }).lean();

    // Step 1: Load previous month's customer closing balances
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonthKey = `${prevYear}-${String(prevMonth).padStart(2, "0")}`;
    const previousClosure = await MonthlyClosure.findOne({
      month: prevMonthKey,
    });

    const prevCustomerBalances = previousClosure?.customerBalances || new Map();

    // Step 2: Set initial balance from previous month's closing or customer's opening balance
    const receivableMap = {};
    customers.forEach((customer) => {
      const cid = customer._id.toString();
      receivableMap[cid] =
        prevCustomerBalances.get?.(cid) ?? customer.openingBalance ?? 0;
    });

    // Step 3: Add sales in the selected month
    const sales = await SalesEntry.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    }).lean();

    sales.forEach((sale) => {
      sale.customers.forEach((custSale) => {
        const cid = custSale.customer.toString();
        if (!receivableMap[cid]) receivableMap[cid] = 0;
        receivableMap[cid] += custSale.totalAmount;
      });
    });

    // Step 4: Subtract payments in the selected month
    const payments = await Payment.find({
      paymentType: "PaymentIn",
      category: "customer",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).lean();

    payments.forEach((payment) => {
      const cid = payment.customer?.toString();
      if (cid) {
        if (!receivableMap[cid]) receivableMap[cid] = 0;
        receivableMap[cid] -= payment.amount;
      }
    });

    // Step 5: Format result
    const totalReceivables = Object.values(receivableMap).reduce((sum, val) => {
      return sum + (val > 0 ? val : 0);
    }, 0);

    const breakdown = customers
      .map((c) => {
        const cid = c._id.toString();
        const balance = receivableMap[cid] || 0;
        return {
          customerName: c.customerName,
          openingBalance:
            prevCustomerBalances.get?.(cid) ?? c.openingBalance ?? 0,
          balance,
        };
      })
      .filter((c) => c.balance > 0);

    res.json({
      month: selectedMonth,
      totalReceivables,
      breakdown,
      previousMonthSummary: previousClosure?.totals || {},
    });
  } catch (err) {
    console.error("Error calculating receivables:", err);
    res
      .status(500)
      .json({ message: "Failed to calculate receivables from customers." });
  }
};

// ========== 2. Receivables from Employees ==========
//done
const getReceivablesFromEmployees = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // Expected format: "YYYY-MM"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // 1. Fetch "other" payments (for receivables)
    const otherPayments = await Payment.find({
      category: "employee",
      purpose: "other",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .populate("employee", "employeeName")
      .lean();

    const employeeMap = {};
    otherPayments.forEach((payment) => {
      const eid = payment.employee?._id?.toString();
      if (!eid) return;

      if (!employeeMap[eid]) {
        employeeMap[eid] = {
          employeeName: payment.employee.employeeName,
          balance: 0,
        };
      }

      if (payment.paymentType === "PaymentOut") {
        employeeMap[eid].balance += payment.amount;
      } else if (payment.paymentType === "PaymentIn") {
        employeeMap[eid].balance -= payment.amount;
      }
    });

    const breakdown = Object.values(employeeMap).filter(e => e.balance !== 0);
    const totalReceivables = breakdown.reduce((sum, e) => sum + e.balance, 0);

    // 2. Fetch "salary" payments
    const salaryPayments = await Payment.find({
      category: "employee",
      purpose: "salary",
      paymentType: "PaymentOut",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .populate("employee", "employeeName")
      .lean();

    const salaryMap = {};
    salaryPayments.forEach((payment) => {
      const eid = payment.employee?._id?.toString();
      if (!eid) return;

      if (!salaryMap[eid]) {
        salaryMap[eid] = {
          employeeName: payment.employee.employeeName,
          totalSalary: 0,
        };
      }

      salaryMap[eid].totalSalary += payment.amount;
    });

    const salaryBreakdown = Object.values(salaryMap);
    const totalSalaries = salaryBreakdown.reduce((sum, e) => sum + e.totalSalary, 0);

    // 3. Return combined response
    res.json({
      month: selectedMonth,
      totalReceivables,
      breakdown,
      totalSalaries,
      salaryBreakdown,
    });
  } catch (err) {
    console.error("Error fetching employee receivables/salaries:", err);
    res.status(500).json({ message: "Failed to fetch employee data." });
  }
};


// ========== 3. Receivables from market ==========
//no idea
const getMarketFeesFromSuppliers = async (req, res) => {
  try {
    // Fetch suppliers and their market fees
    const suppliers = await Supplier.find({}).lean();

    // If no suppliers are found, return an empty response
    if (!suppliers.length) {
      return res.json({ totalMarketFees: 0, breakdown: [] });
    }

    const supplierMap = {};

    // Loop through suppliers and track each supplier's market fee
    suppliers.forEach((supplier) => {
      const supplierId = supplier._id.toString(); // Ensure we use the supplier's ID

      // Initialize supplier if not already in the map
      if (!supplierMap[supplierId]) {
        supplierMap[supplierId] = {
          marketFee: 0,
          supplierName: supplier.supplierName, // Get the supplier name from the schema
        };
      }

      // Add the market fee to the supplier's total market fee
      supplierMap[supplierId].marketFee += supplier.marketFee; // Add the marketFee to the total
    });

    // Build the breakdown array of suppliers with their market fees
    const breakdown = Object.values(supplierMap);

    // Calculate total market fees by summing all suppliers' market fees
    const totalMarketFees = breakdown.reduce(
      (sum, supplier) => sum + supplier.marketFee,
      0
    );

    // Return the total and the breakdown of supplier market fees
    res.json({ totalMarketFees, breakdown });
  } catch (err) {
    console.error("Error fetching market fees from suppliers:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch market fees from suppliers." });
  }
};

// ========== 4. Receivables from stock in hand ==========
//done
const getStockInHand = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // e.g., "2025-05"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch purchases only in the selected month
    const purchases = await PurchaseEntry.find({
      dateOfPurchase: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .populate("items.item", "itemName")
      .lean();

    const itemMap = {};

    for (const purchase of purchases) {
      for (const purchaseItem of purchase.items) {
        const itemId = purchaseItem.item?._id?.toString();
        const itemName = purchaseItem.item?.itemName;

        if (!itemId || !itemName) continue;

        const remainingQty = purchaseItem.remainingQuantity || 0;

        if (remainingQty <= 0) continue;

        const unitPrice = purchaseItem.unitPrice || 0;
        const stockValue = remainingQty * unitPrice;

        if (itemMap[itemId]) {
          itemMap[itemId].quantity += remainingQty;
          itemMap[itemId].value += stockValue;
        } else {
          itemMap[itemId] = {
            itemName,
            quantity: remainingQty,
            unitPrice,
            value: stockValue,
          };
        }
      }
    }

    const breakdown = Object.values(itemMap);
    const totalStockValue = breakdown.reduce(
      (sum, item) => sum + item.value,
      0
    );

    return res.json({
      month: selectedMonth,
      totalStockValue,
      breakdown,
    });
  } catch (err) {
    console.error("Error fetching stock in hand:", err);
    return res.status(500).json({ message: "Failed to fetch stock in hand." });
  }
};

// ========== 5. Receivables from cashbalance ==========
//done
const getCashBalance = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // Expected format: "YYYY-MM"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // Get start and end of the selected month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch cash payments within the selected month
    const payments = await Payment.find({
      paymentMode: "Cash",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).lean();

    let totalPaymentsIn = 0;
    let totalPaymentsOut = 0;

    payments.forEach((payment) => {
      if (payment.paymentType === "PaymentIn") {
        totalPaymentsIn += payment.amount;
      } else if (payment.paymentType === "PaymentOut") {
        totalPaymentsOut += payment.amount;
      }
    });

    const cashBalance = totalPaymentsIn - totalPaymentsOut;

    res.json({ month: selectedMonth, cashBalance });
  } catch (error) {
    console.error("Error calculating cash balance:", error);
    res.status(500).json({ message: "Failed to calculate cash balance" });
  }
};

// ========== 6. Receivables from commission==========
//done
const getCommissionsFromSuppliers = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // Example: "2025-05"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Aggregate commissionPaid by supplier for the selected month
    const commissions = await PurchaseEntry.aggregate([
      {
        $match: {
          dateOfPurchase: { $gte: startOfMonth, $lte: endOfMonth },
          commissionPaid: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: "$supplier",
          totalCommission: { $sum: "$commissionPaid" },
        },
      },
      {
        $lookup: {
          from: "suppliers", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "supplierDetails",
        },
      },
      {
        $unwind: "$supplierDetails",
      },
      {
        $project: {
          supplierName: "$supplierDetails.supplierName",
          totalCommission: 1,
        },
      },
    ]);

    const totalCommission = commissions.reduce(
      (sum, item) => sum + item.totalCommission,
      0
    );

    res.json({
      month: selectedMonth,
      totalCommission,
      breakdown: commissions.map((entry) => ({
        supplierName: entry.supplierName,
        commission: entry.totalCommission,
      })),
    });
  } catch (err) {
    console.error("Error fetching supplier commissions from purchases:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch commissions from purchase entries." });
  }
};

// ========== 7. Receivables from coolie ==========

//done
const getCoolieFromSuppliers = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // Expected format: "YYYY-MM"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const coolies = await PurchaseEntry.aggregate([
      {
        $match: {
          dateOfPurchase: { $gte: startOfMonth, $lte: endOfMonth },
          marketFee: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: "$supplier",
          totalCoolie: { $sum: "$marketFee" },
        },
      },
      {
        $lookup: {
          from: "suppliers", // collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "supplierDetails",
        },
      },
      {
        $unwind: "$supplierDetails",
      },
      {
        $project: {
          supplierName: "$supplierDetails.supplierName",
          totalCoolie: 1,
        },
      },
    ]);

    const totalCoolie = coolies.reduce(
      (sum, item) => sum + item.totalCoolie,
      0
    );

    res.json({
      month: selectedMonth,
      totalCoolie,
      breakdown: coolies.map((entry) => ({
        supplierName: entry.supplierName,
        coolie: entry.totalCoolie,
      })),
    });
  } catch (err) {
    console.error("Error fetching coolie from purchases:", err);
    res.status(500).json({ message: "Failed to fetch coolie data." });
  }
};

// ========== 8. Receivables from lender ==========
//done
const getLenderPayables = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // e.g., "2025-05"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch lenders
    const lenders = await Lender.find({}).lean();

    // Fetch payments to/from lenders in the selected month
    const payments = await Payment.find({
      category: "lender",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).lean();

    const lenderPayables = {};

    lenders.forEach((lender) => {
      lenderPayables[lender._id.toString()] = {
        lenderName: lender.name, // Adjust based on your schema
        payable: 0,
      };
    });

    payments.forEach((payment) => {
      const lid = payment.lender?.toString();
      if (!lid) return;

      if (!lenderPayables[lid]) {
        lenderPayables[lid] = {
          lenderName: "Unknown Lender",
          payable: 0,
        };
      }

      if (payment.paymentType === "PaymentIn") {
        lenderPayables[lid].payable += payment.amount;
      } else if (payment.paymentType === "PaymentOut") {
        lenderPayables[lid].payable -= payment.amount;
      }
    });

    const breakdown = Object.values(lenderPayables).filter(
      (l) => l.payable !== 0
    );
    const totalPayables = breakdown.reduce((sum, l) => sum + l.payable, 0);

    res.json({ month: selectedMonth, totalPayables, breakdown });
  } catch (err) {
    console.error("Error calculating lender payables:", err);
    res.status(500).json({ message: "Failed to fetch lender payables." });
  }
};

// ========== 9. Receivables from supplier ==========
//done
const getSupplierBalances = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // Example: "2025-05"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    // Fetch data
    const suppliers = await Supplier.find({});

    const purchases = await PurchaseEntry.find({
      dateOfPurchase: { $gte: startOfMonth, $lte: endOfMonth },
    }).lean();

    const payments = await Payment.find({
      paymentType: { $in: ["PaymentOut", "PaymentIn"] },
      category: "supplier",
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }).lean();

    const balancesMap = {};

    // Initialize with opening balances
    suppliers.forEach((s) => {
      balancesMap[s._id.toString()] = s.openingBalance || 0;
    });

    // Add purchases (increase payables)
    purchases.forEach((purchase) => {
      const supplierId = purchase.supplier?.toString();
      if (supplierId) {
        balancesMap[supplierId] = balancesMap[supplierId] || 0;
        balancesMap[supplierId] += purchase.netTotalAmount;
      }
    });

    // Add payments
    payments.forEach((payment) => {
      const supplierId = payment.supplier?.toString();
      if (supplierId) {
        balancesMap[supplierId] = balancesMap[supplierId] || 0;

        if (payment.paymentType === "PaymentOut") {
          balancesMap[supplierId] -= payment.amount;
        } else if (payment.paymentType === "PaymentIn") {
          balancesMap[supplierId] += payment.amount;
        }
      }
    });

    // Prepare results
    const payables = [];
    const receivables = [];

    suppliers.forEach((s) => {
      const supplierId = s._id.toString();
      const balance = balancesMap[supplierId] || 0;

      if (balance > 0) {
        payables.push({
          supplierId,
          supplierName: s.supplierName,
          balance: Number(balance.toFixed(2)),
        });
      } else if (balance < 0) {
        receivables.push({
          supplierId,
          supplierName: s.supplierName,
          balance: Number(Math.abs(balance.toFixed(2))),
        });
      }
    });

    res.json({
      month: selectedMonth,
      payables,
      receivables,
    });
  } catch (err) {
    console.error("Error fetching supplier balances:", err);
    res.status(500).json({ message: "Failed to fetch supplier balances." });
  }
};

// ========== 10. Receivables from profit and loss ==========
// done
const getDetailedProfitAndLoss = async (req, res) => {
  try {
    // 1. Get and validate `month` query param
    const selectedMonth = req.query.month; // Format: "YYYY-MM"
    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // 2. Calculate start and end of the selected month
    const startOfMonth = new Date(year, month - 1, 1); // e.g., 2024-04-01
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999); // last day of the month

    // 3. Fetch only sales entries within the month
    const sales = await SalesEntry.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .populate({
        path: "customers.items.item",
        model: "Item",
      })
      .populate({
        path: "customers.items.supplier",
        model: "Supplier",
      })
      .populate({
        path: "purchase",
        model: "PurchaseEntry",
      });

    let results = [];
    let totalProfit = 0;
    let totalLoss = 0;

    for (const sale of sales) {
      const purchase = sale.purchase;
      const purchaseItems = purchase?.items || [];
      const purchaseSupplierId = purchase?.supplier?.toString();

      if (!purchaseItems.length || !purchaseSupplierId) {
        console.warn(
          `Missing purchase data for sale transaction #${sale.transactionNumber}`
        );
        continue;
      }

      for (const customer of sale.customers) {
        for (const item of customer.items) {
          const { quantity, unitPrice, supplier, item: itemRef } = item;

          if (!itemRef || !supplier) {
            console.warn(
              `Skipping: Missing item or supplier. Item: ${
                itemRef ? itemRef.name : "undefined"
              }, Supplier: ${supplier ? supplier.name : "undefined"}`
            );
            continue;
          }

          const purchaseItem = purchaseItems.find(
            (p) =>
              p.item?.toString() === itemRef._id.toString() &&
              purchaseSupplierId === supplier._id.toString()
          );

          if (!purchaseItem) {
            console.warn(
              `No matching purchase for item: ${itemRef.name} [${itemRef._id}] from supplier: ${supplier.name} [${supplier._id}]`
            );
            continue;
          }

          const costPrice = purchaseItem.unitPrice;
          const totalSellingPrice = unitPrice * quantity;
          const totalCostPrice = costPrice * quantity;
          const diff = totalSellingPrice - totalCostPrice;

          const record = {
            item: itemRef.name,
            supplier: supplier.name,
            quantity,
            unitPrice,
            costPrice,
            totalSellingPrice,
            totalCostPrice,
            profitAmount: diff > 0 ? diff : 0,
            lossAmount: diff < 0 ? Math.abs(diff) : 0,
            status: diff > 0 ? "profit" : diff < 0 ? "loss" : "break-even",
          };

          if (diff > 0) totalProfit += diff;
          else if (diff < 0) totalLoss += Math.abs(diff);

          results.push(record);
        }
      }
    }

    return res.json({
      summary: {
        totalProfit,
        totalLoss,
        netProfitOrLoss: totalProfit - totalLoss,
        status:
          totalProfit > totalLoss
            ? "profit"
            : totalLoss > totalProfit
            ? "loss"
            : "break-even",
      },
      breakdown: results,
      month: selectedMonth,
    });
  } catch (err) {
    console.error("Error calculating detailed profit and loss:", err);
    return res
      .status(500)
      .json({ message: "Failed to calculate detailed profit and loss." });
  }
};


const getExpensePaymentsByMonth = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // e.g., "2025-05"

    if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) {
      return res
        .status(400)
        .json({ message: "Invalid month format. Use YYYY-MM" });
    }

    const [yearStr, monthStr] = selectedMonth.split("-");
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const results = await Payment.aggregate([
      {
        $match: {
          category: "expense",
          paymentType: "PaymentOut",
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$expense", // group by expense ID
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "_id",
          as: "expenseInfo",
        },
      },
      {
        $unwind: "$expenseInfo",
      },
      {
        $project: {
          _id: 0,
          expenseId: "$_id",
          expenseName: "$expenseInfo.expense",
          totalAmount: 1,
        },
      },
    ]);

    const totalExpenses = results.reduce((sum, r) => sum + r.totalAmount, 0);

    res.json({
      month: selectedMonth,
      totalExpenses,
      breakdown: results,
    });
  } catch (err) {
    console.error("Error fetching grouped expense payments:", err);
    res.status(500).json({ message: "Failed to fetch expense payments." });
  }
};


module.exports = {
  getReceivablesFromCustomers,
  // getSupplierPayables,
  getReceivablesFromEmployees,
  getMarketFeesFromSuppliers,
  getCashBalance,
  getCommissionsFromSuppliers,
  getCoolieFromSuppliers,
  // getPayablesToSuppliers,
  getLenderPayables,
  getSupplierBalances,
  getStockInHand,
  getDetailedProfitAndLoss,
  getExpensePaymentsByMonth
};

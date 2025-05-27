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
const getReceivablesFromCustomers = async (req, res) => {
  try {
    // Step 1: Get all customers
    const customers = await Customer.find().lean();

    // Step 2: Initialize map with opening balances
    const receivableMap = {};
    customers.forEach((customer) => {
      const cid = customer._id.toString();
      receivableMap[cid] = customer.openingBalance ?? 0;
    });

    // Step 3: Add total sales per customer (no date filter)
    const sales = await SalesEntry.find().lean();
    sales.forEach((sale) => {
      sale.customers.forEach((custSale) => {
        const cid = custSale.customer.toString();
        if (!receivableMap[cid]) receivableMap[cid] = 0;
        receivableMap[cid] += custSale.totalAmount;
      });
    });

    // Step 4: Subtract total payments per customer (no date filter)
    const payments = await Payment.find({
      paymentType: "PaymentIn",
      category: "customer",
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
          openingBalance: c.openingBalance ?? 0,
          balance,
        };
      })
      .filter((c) => c.balance > 0);

    res.json({
      totalReceivables,
      breakdown,
    });
  } catch (err) {
    console.error("Error calculating receivables:", err);
    res.status(500).json({
      message: "Failed to calculate receivables from customers.",
    });
  }
};

// ========== 2. Receivables from Employees ==========
const getReceivablesFromEmployees = async (req, res) => {
  try {
    // Step 1: Get all employees
    const employees = await Employee.find().lean();

    // Step 2: Initialize map with opening balances
    const receivableMap = {};
    employees.forEach((emp) => {
      const eid = emp._id.toString();
      receivableMap[eid] = emp.openingBalance ?? 0;
    });

    // Step 3: Add/subtract "other" payments (not salary)
    const otherPayments = await Payment.find({
      category: "employee",
      purpose: "other",
    })
      .populate("employee", "employeeName")
      .lean();

    otherPayments.forEach((payment) => {
      const eid = payment.employee?._id?.toString();
      if (!eid) return;

      if (!receivableMap[eid]) receivableMap[eid] = 0;

      if (payment.paymentType === "PaymentOut") {
        receivableMap[eid] += payment.amount; // we paid = they owe us
      } else if (payment.paymentType === "PaymentIn") {
        receivableMap[eid] -= payment.amount; // they paid us
      }
    });

    // Step 4: Format receivable breakdown
    const breakdown = employees
      .map((emp) => {
        const eid = emp._id.toString();
        const balance = receivableMap[eid] || 0;
        return {
          employeeName: emp.employeeName,
          openingBalance: emp.openingBalance ?? 0,
          balance,
        };
      })
      .filter((e) => e.balance > 0);

    const totalReceivables = breakdown.reduce((sum, e) => sum + e.balance, 0);

    // Step 5: Also fetch salaries for the selected month
    const selectedMonth = req.query.month;
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
    const totalSalaries = salaryBreakdown.reduce(
      (sum, e) => sum + e.totalSalary,
      0
    );

    // Step 6: Final response
    res.json({
      month: selectedMonth,
      totalReceivables,
      breakdown,
      totalSalaries,
      salaryBreakdown,
    });
  } catch (err) {
    console.error("Error calculating receivables from employees:", err);
    res.status(500).json({
      message: "Failed to calculate receivables from employees.",
    });
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
const getStockInHand = async (req, res) => {
  try {
    const purchases = await PurchaseEntry.find()
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
      totalStockValue,
      breakdown,
    });
  } catch (err) {
    console.error("Error fetching stock in hand:", err);
    return res.status(500).json({ message: "Failed to fetch stock in hand." });
  }
};

// ========== 5. Receivables from cashbalance ==========
const getCashBalance = async (req, res) => {
  try {
    const payments = await Payment.find({
      paymentMode: "Cash",
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

    res.json({ cashBalance });
  } catch (error) {
    console.error("Error calculating cash balance:", error);
    res.status(500).json({ message: "Failed to calculate cash balance" });
  }
};

// ========== 6. Receivables from commission==========
const getCommissionsFromSuppliers = async (req, res) => {
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

    // 1. Total commissionPaid from all time
    const commissions = await PurchaseEntry.aggregate([
      {
        $match: {
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
          from: "suppliers",
          localField: "_id",
          foreignField: "_id",
          as: "supplierDetails",
        },
      },
      { $unwind: "$supplierDetails" },
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

    // 2. Total salary (up to previous month)
    const pastSalaries = await Payment.aggregate([
      {
        $match: {
          category: "employee",
          purpose: "salary",
          paymentType: "PaymentOut",
          date: { $lt: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSalary: { $sum: "$amount" },
        },
      },
    ]);
    const salaryTotal = pastSalaries[0]?.totalSalary || 0;

    // 3. Total expenses (up to previous month)
    const pastExpenses = await Payment.aggregate([
      {
        $match: {
          category: "expense",
          paymentType: "PaymentOut",
          date: { $lt: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);
    const expenseTotal = pastExpenses[0]?.totalExpense || 0;

    // 4. Final net commission
    const netCommission = totalCommission - (salaryTotal + expenseTotal);

    res.json({
      month: selectedMonth,
      totalCommission,
      pastSalaries: salaryTotal,
      pastExpenses: expenseTotal,
      netAfterDeductions: netCommission,
      breakdown: commissions.map((entry) => ({
        supplierName: entry.supplierName,
        commission: entry.totalCommission,
      })),
    });
  } catch (err) {
    console.error("Error fetching commissions:", err);
    res.status(500).json({ message: "Failed to calculate commissions." });
  }
};

// ========== 7. Receivables from coolie ==========
const getCoolieFromSuppliers = async (req, res) => {
  try {
    const selectedMonth = req.query.month; // e.g., "2025-05"

    let matchStage = {
      marketFee: { $gt: 0 },
    };

    if (selectedMonth) {
      // Validate month format
      if (!/^\d{4}-\d{2}$/.test(selectedMonth)) {
        return res
          .status(400)
          .json({ message: "Invalid month format. Use YYYY-MM" });
      }

      const [yearStr, monthStr] = selectedMonth.split("-");
      const year = parseInt(yearStr);
      const month = parseInt(monthStr);

      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

      matchStage.createdAt = { $gte: startOfMonth, $lte: endOfMonth };
    }

    const coolies = await PurchaseEntry.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$supplier",
          totalCoolie: { $sum: "$marketFee" },
        },
      },
      {
        $lookup: {
          from: "suppliers",
          localField: "_id",
          foreignField: "_id",
          as: "supplierDetails",
        },
      },
      { $unwind: "$supplierDetails" },
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
      month: selectedMonth || "all",
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
const getLenderPayables = async (req, res) => {
  try {
    const lenders = await Lender.find({}).lean();

    const payments = await Payment.find({
      category: "lender",
    }).lean();

    const lenderPayables = {};

    lenders.forEach((lender) => {
      lenderPayables[lender._id.toString()] = {
        lenderName: lender.name,
        payable: 0,
      };
    });

    // Calculate payable amounts
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

    res.json({ totalPayables, breakdown });
  } catch (err) {
    console.error("Error calculating lender payables:", err);
    res.status(500).json({ message: "Failed to fetch lender payables." });
  }
};

// ========== 9. Receivables from supplier ==========
const getSupplierBalances = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    const purchases = await PurchaseEntry.find({}).lean();
    const payments = await Payment.find({
      paymentType: { $in: ["PaymentOut", "PaymentIn"] },
      category: "supplier",
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

    const payables = [];
    const receivables = [];

    let totalPayables = 0;
    let totalReceivables = 0;

    suppliers.forEach((s) => {
      const supplierId = s._id.toString();
      const balance = balancesMap[supplierId] || 0;

      if (balance > 0) {
        payables.push({
          supplierId,
          supplierName: s.supplierName,
          balance: Number(balance.toFixed(2)),
        });
        totalPayables += balance;
      } else if (balance < 0) {
        receivables.push({
          supplierId,
          supplierName: s.supplierName,
          balance: Number(Math.abs(balance.toFixed(2))),
        });
        totalReceivables += Math.abs(balance);
      }
    });

    res.json({
      payables,
      receivables,
      totalPayables: Number(totalPayables.toFixed(2)),
      totalReceivables: Number(totalReceivables.toFixed(2)),
    });
  } catch (err) {
    console.error("Error in getSupplierBalances:", err);
    res.status(500).json({ message: "Failed to calculate supplier balances." });
  }
};


// ========== 10. Receivables from profit and loss ==========
const getDetailedProfitAndLoss = async (req, res) => {
  try {
    // Fetch ALL sales entries (no date filter)
    const sales = await SalesEntry.find({})
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
    });
  } catch (err) {
    console.error("Error calculating detailed profit and loss:", err);
    return res
      .status(500)
      .json({ message: "Failed to calculate detailed profit and loss." });
  }
};

// ========== 11. Expense ==========
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

const getVehicleTrialBalanceByType = async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $match: {
          category: "vehicle",
          vehicle: { $ne: null }
        }
      },
      {
        $group: {
          _id: {
            vehicle: "$vehicle",
            paymentType: "$paymentType"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.vehicle",
          payments: {
            $push: {
              type: "$_id.paymentType",
              total: "$total"
            }
          }
        }
      },
      {
        $lookup: {
          from: "pickups", // vehicle collection
          localField: "_id",
          foreignField: "_id",
          as: "vehicle"
        }
      },
      {
        $unwind: "$vehicle"
      },
      {
        $project: {
          vehicleId: "$vehicle._id",
          vehicleName: "$vehicle.vehicleName",
          vehicleNo: "$vehicle.vehicleNo",
          payments: 1
        }
      }
    ]);

    let incomeVehicles = [];
    let expenseVehicles = [];

    let incomeTotals = { totalIn: 0, totalOut: 0, netBalance: 0 };
    let expenseTotals = { totalIn: 0, totalOut: 0, netBalance: 0 };

    for (const v of result) {
      let totalIn = 0;
      let totalOut = 0;

      for (const p of v.payments) {
        if (p.type === "PaymentIn") totalIn += p.total;
        if (p.type === "PaymentOut") totalOut += p.total;
      }

      const net = totalIn - totalOut;

      const vehicleData = {
        vehicleId: v.vehicleId,
        vehicleName: v.vehicleName,
        vehicleNo: v.vehicleNo,
        totalIn,
        totalOut,
        netBalance: Math.abs(net) // Will be overridden below for expense if needed
      };

      if (net >= 0) { 
        incomeVehicles.push(vehicleData);
        incomeTotals.totalIn += totalIn;
        incomeTotals.totalOut += totalOut;
        incomeTotals.netBalance += net;
      } else {
        expenseVehicles.push({
          ...vehicleData,
          netBalance: Math.abs(net) // Show as positive
        });
        expenseTotals.totalIn += totalIn;
        expenseTotals.totalOut += totalOut;
        expenseTotals.netBalance += Math.abs(net); // Keep positive
      }
    }

    res.json({
      income: {
        ...incomeTotals,
        vehicles: incomeVehicles
      },
      expense: {
        ...expenseTotals,
        vehicles: expenseVehicles
      }
    });

  } catch (error) {
    console.error("Error in getVehicleTrialBalanceByType:", error);
    res.status(500).json({ error: "Internal server error" });
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
  getExpensePaymentsByMonth,
  getVehicleTrialBalanceByType
};

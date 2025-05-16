// controllers/trialBalanceController.js

const SalesEntry = require("../../../models/SalesEntry");
const Payment = require("../../../models/Payment");
const Customer = require("../../../models/Customer");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const Supplier = require("../../../models/Supplier");
const Employee = require("../../../models/Employee");
const Lender = require ("../../../models/Lender");
// ========== 1. Receivables from Customers ==========
const getReceivablesFromCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    const sales = await SalesEntry.find({}).lean();
    const payments = await Payment.find({
      paymentType: "PaymentIn",
      category: "customer",
    }).lean();

    const receivableMap = {};

    customers.forEach((c) => {
      receivableMap[c._id.toString()] = c.openingBalance || 0;
    });

    sales.forEach((sale) => {
      sale.customers.forEach((custSale) => {
        const cid = custSale.customer.toString();
        if (!receivableMap[cid]) receivableMap[cid] = 0;
        receivableMap[cid] += custSale.totalAmount;
      });
    });

    payments.forEach((payment) => {
      const cid = payment.customer?.toString();
      if (cid) {
        if (!receivableMap[cid]) receivableMap[cid] = 0;
        receivableMap[cid] -= payment.amount;
      }
    });

    const totalReceivables = Object.values(receivableMap).reduce((sum, val) => {
      return sum + (val > 0 ? val : 0);
    }, 0);

    const breakdown = customers.map((c) => ({
      customerName: c.customerName,
      balance: receivableMap[c._id.toString()] || 0,
    })).filter((c) => c.balance > 0);

    res.json({ totalReceivables, breakdown });
  } catch (err) {
    console.error("Error calculating receivables:", err);
    res.status(500).json({ message: "Failed to calculate receivables from customers." });
  }
};

// ========== 2. Payables to Suppliers ==========
const getSupplierPayables = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    const purchases = await PurchaseEntry.find({}).lean();
    const payments = await Payment.find({
      paymentType: "PaymentOut",
      category: "supplier",
    }).lean();

    const payablesMap = {};

    suppliers.forEach((s) => {
      payablesMap[s._id.toString()] = s.openingBalance || 0;
    });

    purchases.forEach((purchase) => {
      const supplierId = purchase.supplier?.toString();
      if (supplierId) {
        if (!payablesMap[supplierId]) payablesMap[supplierId] = 0;
        payablesMap[supplierId] += purchase.netTotalAmount;
      }
    });

    payments.forEach((payment) => {
      const supplierId = payment.supplier?.toString();
      if (supplierId) {
        if (!payablesMap[supplierId]) payablesMap[supplierId] = 0;
        payablesMap[supplierId] -= payment.amount;
      }
    });

    const breakdown = suppliers.map((s) => ({
      supplierName: s.supplierName,
      balance: payablesMap[s._id.toString()] || 0,
    })).filter(s => s.balance > 0);

    const totalPayables = breakdown.reduce((sum, s) => sum + s.balance, 0);

    res.json({ totalPayables, breakdown });
  } catch (err) {
    console.error("Error fetching supplier payables:", err);
    res.status(500).json({ message: "Failed to fetch supplier payables." });
  }
};

// ========== 3. Receivables from Employees ==========
const getReceivablesFromEmployees = async (req, res) => {
  try {
    // Fetch payments (PaymentOut) and populate the employee data
    const payments = await Payment.find({
      paymentType: "PaymentOut",
      category: "employee",
    })
      .populate('employee', 'employeeName') // Populating the employeeName field from the Employee model
      .lean();

    // If no payments are found, return an empty response
    if (!payments.length) {
      return res.json({ totalReceivables: 0, breakdown: [] });
    }

    const employeeMap = {};

    // Loop through payments and track each employee's balance
    payments.forEach((payment) => {
      const eid = payment.employee?._id.toString(); // Ensure we use the employee's ID
      if (!eid) return;

      // Initialize employee if not already in the map
      if (!employeeMap[eid]) {
        employeeMap[eid] = { balance: 0, employeeName: payment.employee.employeeName }; // Access the employeeName from the populated employee
      }

      // Add the amount to the employee's balance
      employeeMap[eid].balance += payment.amount;
    });

    // Build the breakdown array of employees with their balances
    const breakdown = Object.values(employeeMap);

    // Calculate total receivables by summing all employee balances
    const totalReceivables = breakdown.reduce((sum, e) => sum + e.balance, 0);

    // Return the total and the breakdown of employee receivables
    res.json({ totalReceivables, breakdown });
  } catch (err) {
    console.error("Error fetching employee receivables:", err);
    res.status(500).json({ message: "Failed to fetch receivables from employees." });
  }
};

// ========== 3. Receivables from market ==========

const getMarketFeesFromSuppliers = async (req, res) => {
  try {
    // Fetch suppliers and their market fees
    const suppliers = await Supplier.find({})
      .lean();

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
    const totalMarketFees = breakdown.reduce((sum, supplier) => sum + supplier.marketFee, 0);

    // Return the total and the breakdown of supplier market fees
    res.json({ totalMarketFees, breakdown });
  } catch (err) {
    console.error("Error fetching market fees from suppliers:", err);
    res.status(500).json({ message: "Failed to fetch market fees from suppliers." });
  }
};


const getCashBalance = async (req, res) => {
  try {
    // Fetch all cash-based payments (only those where paymentMode is 'Cash')
    const payments = await Payment.find({ paymentMode: 'Cash' }).lean();

    let totalPaymentsIn = 0;
    let totalPaymentsOut = 0;

    // Loop through payments and sum by type
    payments.forEach(payment => {
      if (payment.paymentType === 'PaymentIn') {
        totalPaymentsIn += payment.amount;
      } else if (payment.paymentType === 'PaymentOut') {
        totalPaymentsOut += payment.amount;
      }
    });

    const cashBalance = totalPaymentsIn - totalPaymentsOut;

    console.log("Cash Balance: ", cashBalance);

    res.json({ cashBalance });
  } catch (error) {
    console.error("Error calculating cash balance:", error);
    res.status(500).json({ message: "Failed to calculate cash balance" });
  }
};

// ========== 3. Receivables from commission==========

const getCommissionsFromSuppliers = async (req, res) => {
  try {
    // Aggregate commissionPaid by supplier
    const commissions = await PurchaseEntry.aggregate([
      {
        $group: {
          _id: "$supplier",
          totalCommission: { $sum: "$commissionPaid" },
        },
      },
      {
        $match: {
          totalCommission: { $gt: 0 },
        },
      },
      {
        $lookup: {
          from: "suppliers", // collection name, not model name
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

// ========== 3. Receivables from coolie ==========


const getCoolieFromSuppliers = async (req, res) => {
  try {
    const coolies = await PurchaseEntry.aggregate([
      {
        $group: {
          _id: "$supplier",
          totalCoolie: { $sum: "$marketFee" },
        },
      },
      {
        $match: {
          totalCoolie: { $gt: 0 },
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

// ========== 3. Receivables from payables ==========

const getPayablesToSuppliers = async (req, res) => {
  try {
    // Step 1: Get all suppliers
    const suppliers = await Supplier.find({}).lean();

    // Step 2: Get all payments related to suppliers
    const payments = await Payment.find({ category: 'supplier' }).lean();

    // Step 3: Create map to track net payable per supplier
    const supplierPayables = {};

    // Initialize with supplier names
    suppliers.forEach(supplier => {
      supplierPayables[supplier._id.toString()] = {
        supplierName: supplier.supplierName,
        payable: 0,
      };
    });

    // Step 4: Apply payments
    payments.forEach(payment => {
      const sid = payment.supplier?.toString();
      if (!sid) return;

      if (!supplierPayables[sid]) {
        supplierPayables[sid] = {
          supplierName: 'Unknown Supplier',
          payable: 0,
        };
      }

      if (payment.paymentType === 'PaymentIn') {
        // Supplier paid company — increase payable
        supplierPayables[sid].payable += payment.amount;
      } else if (payment.paymentType === 'PaymentOut') {
        // Company paid supplier — decrease payable
        supplierPayables[sid].payable -= payment.amount;
      }
    });

    // Step 5: Filter out zero balances
    const breakdown = Object.values(supplierPayables).filter(s => s.payable !== 0);

    const totalPayables = breakdown.reduce((sum, s) => sum + s.payable, 0);

    res.json({ totalPayables, breakdown });
  } catch (err) {
    console.error('Error calculating payables to suppliers:', err);
    res.status(500).json({ message: 'Failed to fetch payables to suppliers.' });
  }
};

const getLenderPayables = async (req, res) => {
  try {
    const lenders = await Lender.find({}).lean();  // Assuming you have a Lender model
    const payments = await Payment.find({ category: 'lender' }).lean();

    const lenderPayables = {};

    lenders.forEach(lender => {
      lenderPayables[lender._id.toString()] = {
        lenderName: lender.name,  // Adjust to your Lender schema
        payable: 0,
      };
    });

    payments.forEach(payment => {
      const lid = payment.lender?.toString();
      if (!lid) return;

      if (!lenderPayables[lid]) {
        lenderPayables[lid] = {
          lenderName: 'Unknown Lender',
          payable: 0,
        };
      }

      if (payment.paymentType === 'PaymentIn') {
        lenderPayables[lid].payable += payment.amount;
      } else if (payment.paymentType === 'PaymentOut') {
        lenderPayables[lid].payable -= payment.amount;
      }
    });

    const breakdown = Object.values(lenderPayables).filter(l => l.payable !== 0);
    const totalPayables = breakdown.reduce((sum, l) => sum + l.payable, 0);

    res.json({ totalPayables, breakdown });
  } catch (err) {
    console.error('Error calculating lender payables:', err);
    res.status(500).json({ message: 'Failed to fetch lender payables.' });
  }
};
module.exports = {
  getReceivablesFromCustomers,
  getSupplierPayables,
  getReceivablesFromEmployees,
  getMarketFeesFromSuppliers,
  getCashBalance,
  getCommissionsFromSuppliers,
  getCoolieFromSuppliers,
  getPayablesToSuppliers,
  getLenderPayables

};

const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Expense = require("../../../models/Expense");
const Supplier = require("../../../models/Supplier");
const Payment = require("../../../models/Payment");
// Unified recent transactions
const getRecentTransactions = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ dateOfSale: -1 }).limit(2);
    const purchases = await Purchase.find().sort({ dateOfPurchase: -1 }).limit(2);
    const expenses = await Payment.find({category:"expense"}).populate("expense").sort({ date: -1 }).limit(2);
    const formattedSales = sales.map((s) => ({
      date: s.dateOfSale,
      module: "Sales",
      // desc: s.description || s.customerName || "Sale",
      amount: s.totalAmount || 0,
    }));

    const formattedPurchases = purchases.map((p) => ({
      date: p.dateOfPurchase,
      module: "Purchase",
      // desc: p.description || p.vendorName || "Purchase",
      amount: p.grossTotalAmount || 0,
    }));

    const formattedExpenses = expenses.map((e) => ({
      date: e.date,
      module: "Expense",
      // desc: e.note || e.category || "Expense",
      amount: e.amount || 0,
    }));

    const combined = [...formattedSales, ...formattedPurchases, ...formattedExpenses];

    // Sort by date (descending)
    combined.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(combined.slice(0, 10)); // Top 10 recent
  } catch (error) {
    console.error("Failed to load recent transactions:", error);
    res.status(500).json({ message: "Server error fetching transactions." });
  }
};

const getNetProfit = async (req, res) => {
  try {
    const totalSales = await Sale.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
    const totalPurchases = await Purchase.aggregate([{ $group: { _id: null, total: { $sum: "$grossTotalAmount" } } }]);
    const expenses = await Expense.aggregate([{ $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    res.json({
      sales: totalSales[0]?.total || 0,
      purchases: totalPurchases[0]?.total || 0,
      expenses:expenses[0]?.total ||0,
    });
  } catch (err) {
    console.error("Summary fetch error:", err);
    res.status(500).json({ message: "Failed to fetch summary." });
  }
};

// ✅ New: Expense Summary with Market Fee
const getExpenseSummary = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}, "marketFee");
    const expenses = await Expense.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const totalMarketFees = suppliers.reduce((sum, s) => sum + (s.marketFee || 0), 0);
    const totalOtherExpenses = expenses.reduce((sum, e) => sum + e.total, 0);
    const totalExpense = totalMarketFees + totalOtherExpenses;

    const formattedExpenses = [
      { name: "Market Fees", value: totalMarketFees, color: "#FACC15" },
      ...expenses.map((e, i) => ({
        name: e._id || "Expenses",
        value: e.total,
        color: ["#6366F1", "#22C55E", "#EF4444", "#06B6D4"][i % 4], // rotating color palette
      })),
    ];

    res.json({
      totalExpense,
      totalMarketFees,
      breakdown: formattedExpenses,
    });
  } catch (err) {
    console.error("Expense summary error:", err);
    res.status(500).json({ message: "Failed to fetch expense summary." });
  }
};

  module.exports = {getRecentTransactions ,getNetProfit,getExpenseSummary};
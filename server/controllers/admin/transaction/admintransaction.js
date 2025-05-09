const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Expense = require("../../../models/Expense");

// Unified recent transactions
const getRecentTransactions = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ dateOfSale: -1 }).limit(2);
    const purchases = await Purchase.find().sort({ dateOfPurchase: -1 }).limit(2);
    const expenses = await Expense.find().sort({ date: -1 }).limit(2);

    const formattedSales = sales.map((s) => ({
      date: s.dateOfSale,
      module: "Sales",
      desc: s.description || s.customerName || "Sale",
      amount: s.totalAmount || 0,
    }));

    const formattedPurchases = purchases.map((p) => ({
      date: p.dateOfPurchase,
      module: "Purchase",
      desc: p.description || p.vendorName || "Purchase",
      amount: p.grossTotalAmount || 0,
    }));

    const formattedExpenses = expenses.map((e) => ({
      date: e.date,
      module: "Expense",
      desc: e.note || e.category || "Expense",
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
module.exports = {getRecentTransactions ,getNetProfit};
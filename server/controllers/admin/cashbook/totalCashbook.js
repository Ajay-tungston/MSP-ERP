const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Payment = require("../../../models/Payment");
const Expense = require("../../../models/Expense");

const getCashbookSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    toDate.setHours(23, 59, 59, 999);

    // Fetch all data in the date range
    const [sales, purchases, payments, expenses] = await Promise.all([
      Sale.find({ dateOfSale: { $gte: fromDate, $lte: toDate } }).lean(),
      Purchase.find({ dateOfPurchase: { $gte: fromDate, $lte: toDate } }).lean(),
      Payment.find({ date: { $gte: fromDate, $lte: toDate } }).lean(),
      Expense.find({ date: { $gte: fromDate, $lte: toDate } }).lean()
    ]);

    const totalExpensesAmount = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const totalCredit =
      sales.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0) +
      payments.filter(p => p.paymentType === 'PaymentIn').reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const totalDebit =
      purchases.reduce((acc, curr) => acc + (curr.grossTotalAmount
        || 0), 0) +
      payments.filter(p => p.paymentType === 'PaymentOut').reduce((acc, curr) => acc + (curr.amount || 0), 0) +
      totalExpensesAmount;

    const closingBalance = totalCredit - totalDebit;

    res.status(200).json({
      totalCredit,
      totalDebit,
      closingBalance
    });

  } catch (err) {
    console.error("Cashbook summary error:", err);
    res.status(500).json({ error: "Failed to fetch cashbook summary." });
  }
};

module.exports = {
  getCashbookSummary
};

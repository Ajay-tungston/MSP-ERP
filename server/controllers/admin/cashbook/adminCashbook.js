const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Payment = require("../../../models/Payment");
const Expense = require("../../../models/Expense");  // Assuming you have an Expense model

const getCashbookData = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 8 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    console.log(startDate);
    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    toDate.setHours(23, 59, 59, 999);
    console.log(fromDate);

    const skip = (parseInt(page) - 1) * parseInt(limit);0
    const pageLimit = parseInt(limit);

    // 🧮 Calculate opening balance
    const pastPayments = await Payment.find({ date: { $lt: fromDate } }).lean();
    console.log(pastPayments);

    const openingIn = pastPayments
      .filter(p => p.paymentType === 'PaymentIn')
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
    console.log("opening in =", openingIn);

    const openingOut = pastPayments
      .filter(p => p.paymentType === 'PaymentOut')
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
    console.log("opening out =", openingOut);

    const openingBalance = openingIn - openingOut;

    const [sales, purchases, payments, expenses, totalCounts] = await Promise.all([
      Sale.find({ dateOfSale: { $gte: fromDate, $lte: toDate } })
        .populate("customers.customer", "customerName")
        .skip(skip)
        .limit(pageLimit)
        .lean(),

      Purchase.find({ dateOfPurchase: { $gte: fromDate, $lte: toDate } })
        .populate({ path: 'supplier', select: 'supplierName' })
        .skip(skip)
        .limit(pageLimit)
        .lean(),

      Payment.find({ date: { $gte: fromDate, $lte: toDate } })
        .populate({ path: 'supplier', select: 'supplierName' })
        .populate({ path: 'customer', select: 'customerName' })
        .populate({ path: 'employee', select: 'employeeName' })
        .populate({ path: 'company', select: 'companyName' })
        .skip(skip)
        .limit(pageLimit)
        .lean(),

      Expense.find({ date: { $gte: fromDate, $lte: toDate } })
        .skip(skip)
        .limit(pageLimit)
        .lean(),

      Promise.all([
        Sale.countDocuments({ dateOfSale: { $gte: fromDate, $lte: toDate } }),
        Purchase.countDocuments({ dateOfPurchase: { $gte: fromDate, $lte: toDate } }),
        Payment.countDocuments({ date: { $gte: fromDate, $lte: toDate } }),
        Expense.countDocuments({ date: { $gte: fromDate, $lte: toDate } })
      ])
    ]);

    const [totalSales, totalPurchases, totalPayments, totalExpenses] = totalCounts;

    const paymentIns = payments.filter(p => p.paymentType === 'PaymentIn');
    const paymentOuts = payments.filter(p => p.paymentType === 'PaymentOut');

    const totalExpensesAmount = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);  // Summing up the total expenses

    res.status(200).json({
      openingBalance, // 🟢 Return the calculated opening balance
      sales,
      purchases,
      paymentIns,
      paymentOuts,
      expenses, // 🟢 Include the fetched expenses data
      totalExpensesAmount, // 🟢 Include total expenses
      pagination: {
        currentPage: parseInt(page),
        limit: pageLimit,
        totalSales,
        totalPurchases,
        totalPayments,
        totalExpenses
      }
    });
  } catch (err) {
    console.error("Cashbook fetch error:", err);
    res.status(500).json({ error: "Failed to generate cashbook data." });
  }
};

module.exports = { getCashbookData };

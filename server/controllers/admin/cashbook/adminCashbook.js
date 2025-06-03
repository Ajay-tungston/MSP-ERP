const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Payment = require("../../../models/Payment");
const Expense = require("../../../models/Expense");

const getCashbookData = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 8 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    toDate.setHours(23, 59, 59, 999);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const pageLimit = parseInt(limit);

    // Calculate opening balance
    const pastPayments = await Payment.find({ date: { $lt: fromDate } }).lean();
    const openingIn = pastPayments.filter(p => p.paymentType === 'PaymentIn').reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const openingOut = pastPayments.filter(p => p.paymentType === 'PaymentOut').reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const openingBalance = openingIn - openingOut;

    // Fetch all data without pagination
    const [sales, purchases, payments, expenses, totalCounts] = await Promise.all([
      Sale.find({ dateOfSale: { $gte: fromDate, $lte: toDate } })
        .populate("customers.customer", "customerName")
        .lean(),
      Purchase.find({ dateOfPurchase: { $gte: fromDate, $lte: toDate } })
        .populate({ path: 'supplier', select: 'supplierName' })
        .lean(),
      Payment.find({ date: { $gte: fromDate, $lte: toDate } })
      .populate([
        { path: 'supplier', select: 'supplierName' },
        { path: 'customer', select: 'customerName' },
        { path: 'employee', select: 'employeeName' },
        { path: 'company', select: 'companyName' },
        { path: 'expense', select: 'expense' },
        { path: 'vehicle', select: 'vehicleName' },
        { path: 'lender', select: 'name' },
      ])
              .lean(),
      Expense.find({ date: { $gte: fromDate, $lte: toDate } }).lean(),
      Promise.all([
        Sale.countDocuments({ dateOfSale: { $gte: fromDate, $lte: toDate } }),
        Purchase.countDocuments({ dateOfPurchase: { $gte: fromDate, $lte: toDate } }),
        Payment.countDocuments({ date: { $gte: fromDate, $lte: toDate } }),
        Expense.countDocuments({ date: { $gte: fromDate, $lte: toDate } })
      ])
    ]);

    const [totalSales, totalPurchases, totalPayments, totalExpenses] = totalCounts;

    // Combine all transactions with a common date field
    const allTransactions = [];
    sales.forEach(s => allTransactions.push({ ...s, type: 'sale', date: s.dateOfSale }));
    purchases.forEach(p => allTransactions.push({ ...p, type: 'purchase', date: p.dateOfPurchase }));
    payments.forEach(p => allTransactions.push({ 
      ...p, 
      type: p.paymentType.toLowerCase(), // 'paymentin' or 'paymentout'
      date: p.date 
    }));

    expenses.forEach(e => allTransactions.push({ ...e, type: 'expense', date: e.date }));

    // Sort transactions by date
    allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Apply pagination
    const paginatedTransactions = allTransactions.slice(skip, skip + pageLimit);

    // Categorize transactions
    const categorized = {
      sales: [],
      purchases: [],
      paymentIns: [],
      paymentOuts: [],
      expenses: []
    };

    paginatedTransactions.forEach(transaction => {
      const { type, ...rest } = transaction;
      if (type === 'sale') categorized.sales.push(rest);
      else if (type === 'purchase') categorized.purchases.push(rest);
      else if (type === 'paymentin') categorized.paymentIns.push(rest);
      else if (type === 'paymentout') categorized.paymentOuts.push(rest);
      else if (type === 'expense') categorized.expenses.push(rest);
    });

    // Calculate totals
    const totalTransactions = totalSales + totalPurchases + totalPayments + totalExpenses;
    const totalExpensesAmount = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    res.status(200).json({
      openingBalance,
      ...categorized,
      totalExpensesAmount,
      pagination: {
        currentPage: parseInt(page),
        limit: pageLimit,
        totalTransactions,
        totalPages: Math.ceil(totalTransactions / pageLimit),
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
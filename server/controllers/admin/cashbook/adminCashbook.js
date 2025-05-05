const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Payment = require("../../../models/Payment");

const getCashbookData = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    toDate.setHours(23, 59, 59, 999);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const pageLimit = parseInt(limit);

    const [sales, purchases, payments, totalCounts] = await Promise.all([
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

      Promise.all([
        Sale.countDocuments({ dateOfSale: { $gte: fromDate, $lte: toDate } }),
        Purchase.countDocuments({ dateOfPurchase: { $gte: fromDate, $lte: toDate } }),
        Payment.countDocuments({ date: { $gte: fromDate, $lte: toDate } }),
      ])
    ]);

    const [totalSales, totalPurchases, totalPayments] = totalCounts;

    const paymentIns = payments.filter(p => p.paymentType === 'PaymentIn');
    const paymentOuts = payments.filter(p => p.paymentType === 'PaymentOut');

    res.status(200).json({
      sales,
      purchases,
      paymentIns,
      paymentOuts,
      pagination: {
        currentPage: parseInt(page),
        limit: pageLimit,
        totalSales,
        totalPurchases,
        totalPayments
      }
    });
  } catch (err) {
    console.error("Cashbook fetch error:", err);
    res.status(500).json({ error: "Failed to generate cashbook data." });
  }
};

module.exports = { getCashbookData };

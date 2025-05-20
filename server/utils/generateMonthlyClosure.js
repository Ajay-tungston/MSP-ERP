const MonthlyClosure = require("../models/MonthlyClosure");
const PurchaseEntry = require("../models/PurchaseEntry");
const SalesEntry = require("../models/SalesEntry");
const Payment = require("../models/Payment");
const Customer = require("../models/Customer");

async function generateMonthlyClosure() {
  const now = new Date();
  const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const existing = await MonthlyClosure.findOne({ month: monthStr });
  if (existing) {
    console.log("Monthly summary already exists for", monthStr);
    return;
  }

  const purchases = await PurchaseEntry.aggregate([
    { $match: { dateOfPurchase: { $gte: startOfMonth, $lte: endOfMonth } } },
    {
      $group: {
        _id: null,
        totalGross: { $sum: "$grossTotalAmount" },
        totalNet: { $sum: "$netTotalAmount" },
        totalCommission: { $sum: "$commissionPaid" },
        totalMarketFee: { $sum: "$marketFee" },
      },
    },
  ]);

  const sales = await SalesEntry.aggregate([
    { $match: { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } } },
    { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } },
  ]);

  const paymentsIn = await Payment.aggregate([
    {
      $match: {
        paymentType: "PaymentIn",
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const paymentsOut = await Payment.aggregate([
    {
      $match: {
        paymentType: "PaymentOut",
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const customers = await Customer.find({});
  const customerReceivableMap = {};

  customers.forEach((c) => {
    customerReceivableMap[c._id.toString()] = c.openingBalance || 0;
  });

  const monthlySales = await SalesEntry.find({
    dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
  });

  for (let sale of monthlySales) {
    for (let cust of sale.customers) {
      const cid = cust.customer.toString();
      if (!customerReceivableMap[cid]) customerReceivableMap[cid] = 0;
      customerReceivableMap[cid] += cust.totalAmount;
    }
  }

  const customerPayments = await Payment.find({
    paymentType: "PaymentIn",
    category: "customer",
    date: { $gte: startOfMonth, $lte: endOfMonth },
  });

  for (let payment of customerPayments) {
    const cid = payment.customer?.toString();
    if (cid) {
      if (!customerReceivableMap[cid]) customerReceivableMap[cid] = 0;
      customerReceivableMap[cid] -= payment.amount;
    }
  }

  await MonthlyClosure.create({
    month: monthStr,
    totals: {
      purchase: purchases[0]?.totalNet || 0,
      sale: sales[0]?.totalAmount || 0,
      commissionPaid: purchases[0]?.totalCommission || 0,
      marketFee: purchases[0]?.totalMarketFee || 0,
      paymentIn: paymentsIn[0]?.total || 0,
      paymentOut: paymentsOut[0]?.total || 0,
    },
    customerBalances: customerReceivableMap,
  });

  console.log("✅ Monthly closure saved for", monthStr);
}

module.exports = generateMonthlyClosure;
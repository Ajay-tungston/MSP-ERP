const Sale = require("../../../models/SalesEntry");
const Purchase = require("../../../models/PurchaseEntry");
const Expense = require("../../../models/Expense");
const Supplier = require("../../../models/Supplier");
const Payment = require("../../../models/Payment");
// Unified recent transactions
const getRecentTransactions = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ dateOfSale: -1 }).limit(2);
    const purchases = await Purchase.find().sort({ dateOfPurchase: -1 }).limit(2).populate("supplier");
    const expenses = await Payment.find({ category: "expense" }).populate("expense").sort({ date: -1 }).limit(2);
    const formattedSales = sales.map((s) => ({
      date: s.dateOfSale,
      module: "Sales",
      desc: `bill no: ${s.transactionNumber}` || "--",
      amount: s.totalAmount || 0,
    }));

    const formattedPurchases = purchases.map((p) => ({
      date: p.dateOfPurchase,
      module: "Purchase",
      desc: `from ${p.supplier.supplierName}` || "--",
      amount: p.grossTotalAmount || 0,
    }));

    const formattedExpenses = expenses.map((e) => ({
      date: e.date,
      module: "Expense",
      desc: `for ${e.expense.expense}` || "--",
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
    // Total Sales
    const totalSales = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Total Purchases
    const totalPurchases = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$grossTotalAmount" },
        },
      },
    ]);

    // Total Expenses from Payments collection
    const expensePayments = await Payment.aggregate([
      {
        $match: {
          category: "expense",
          paymentType: "PaymentOut",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      sales: totalSales[0]?.total || 0,
      purchases: totalPurchases[0]?.total || 0,
      expenses: expensePayments[0]?.total || 0,
    });
  } catch (err) {
    console.error("Summary fetch error:", err);
    res.status(500).json({ message: "Failed to fetch summary." });
  }
};

// ✅ New: Expense Summary with Market Fee
//changed this logic to get the total expenses from the payment collection(and used the controler in trial)
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

const getTodayKPI = async (req, res) => {
  try {
    const now = new Date();

    // IST offset in milliseconds
    const istOffset = 5.5 * 60 * 60000;
    const localNow = new Date(now.getTime() + istOffset);

    // Get today's and tomorrow's date in UTC (adjusted for IST)
    const todayStartIST = new Date(Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth(), localNow.getUTCDate()));
    const tomorrowStartIST = new Date(todayStartIST);
    tomorrowStartIST.setUTCDate(todayStartIST.getUTCDate() + 1);

    // Fetch entries for today (based on date fields only)
    const purchaseEntries = await Purchase.find({
      dateOfPurchase: { $gte: todayStartIST, $lt: tomorrowStartIST },
    });

    const salesEntries = await Sale.find({
      dateOfSale: { $gte: todayStartIST, $lt: tomorrowStartIST },
    });

    // Helper to merge date and time
    const mergeDateAndTime = (dateOnly, timeSource) => {
      const date = new Date(dateOnly);
      const time = new Date(timeSource);
      date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
      return date;
    };

    // Generate 3-hour time slots in IST
    const generateTimeSlots = () => {
      const slots = [];
      for (let i = 0; i < 24; i += 3) {
        const label = new Date(Date.UTC(2000, 0, 1, i)).toLocaleTimeString("en-IN", {
          hour: "numeric",
          hour12: true,
          timeZone: "Asia/Kolkata",
        });
        slots.push({ label, start: i, end: i + 3 });
      }
      return slots;
    };

    const slots = generateTimeSlots();

    const kpiData = slots.map(({ label, start, end }) => {
      const slotStart = new Date(todayStartIST);
      slotStart.setUTCHours(start, 0, 0, 0);
      const slotEnd = new Date(todayStartIST);
      slotEnd.setUTCHours(end, 0, 0, 0);

      const purchaseSum = purchaseEntries
        .filter((p) => {
          const actualDateTime = mergeDateAndTime(p.dateOfPurchase, p.updatedAt);
          return actualDateTime >= slotStart && actualDateTime < slotEnd;
        })
        .reduce((acc, cur) => acc + (cur.netTotalAmount || 0), 0);

      const salesSum = salesEntries
        .filter((s) => {
          const actualDateTime = mergeDateAndTime(s.dateOfSale, s.updatedAt);
          return actualDateTime >= slotStart && actualDateTime < slotEnd;
        })
        .reduce((acc, cur) => acc + (cur.totalAmount || 0), 0);

      return {
        label,
        Purchase: Number(purchaseSum.toFixed(2)),
        Sales: Number(salesSum.toFixed(2)),
      };
    });

    // Optional: repeat first point for smooth graphing loop
    kpiData.push({ ...kpiData[0] });

    res.json(kpiData);
  } catch (error) {
    console.error("KPI Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { getRecentTransactions, getNetProfit, getExpenseSummary, getTodayKPI };
const express = require("express");
const { getRecentTransactions,getNetProfit,getExpenseSummary } = require("../../../controllers/admin/transaction/admintransaction");
const router = express.Router();


router.get("/transactions", getRecentTransactions );
router.get("/profit",getNetProfit)
router.get("/summary",getExpenseSummary)
module.exports = router;

const express = require("express");
const { getRecentTransactions,getNetProfit,getExpenseSummary,getTodayKPI } = require("../../../controllers/admin/transaction/admintransaction");
const router = express.Router();
const verifyjwt = require("../../../middleware/verifyJwt");

router.get("/transactions",verifyjwt, getRecentTransactions );
router.get("/profit",verifyjwt,getNetProfit)
router.get("/summary",verifyjwt,getExpenseSummary)
router.get("/today",verifyjwt,getTodayKPI)
module.exports = router;

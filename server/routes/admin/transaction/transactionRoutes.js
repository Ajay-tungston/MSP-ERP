const express = require("express");
const { getRecentTransactions,getNetProfit } = require("../../../controllers/admin/transaction/admintransaction");
const router = express.Router();


router.get("/transactions", getRecentTransactions );
router.get("/profit",getNetProfit)
module.exports = router;

const express = require("express");

const verifyJwt = require("../../../middleware/verifyJwt");
const { getTrialBalance } = require("../../../controllers/admin/trialBalance/trialBalanceController");
const router = express.Router();


router.get("/get",verifyJwt,getTrialBalance)

module.exports = router;

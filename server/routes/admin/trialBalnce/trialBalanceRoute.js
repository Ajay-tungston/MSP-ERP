const express = require("express");
const verifyJwt = require("../../../middleware/verifyJwt");
const { getReceivablesFromCustomers,
    getSupplierPayables,
    getReceivablesFromEmployees,
    getMarketFeesFromSuppliers,
      getCommissionsFromSuppliers,
      getPayablesToSuppliers,
} = require("../../../controllers/admin/trialBalance/balanceController");

const router = express.Router();

router.get("/receivable", verifyJwt, getReceivablesFromCustomers);
router.get("/suppliers", verifyJwt,getSupplierPayables );
router.get('/employee',verifyJwt, getReceivablesFromEmployees);
router.get('/marketfee',verifyJwt,getMarketFeesFromSuppliers)
router.get('/commission',verifyJwt,getCommissionsFromSuppliers)
router.get('/pay',verifyJwt,getPayablesToSuppliers)
module.exports = router;

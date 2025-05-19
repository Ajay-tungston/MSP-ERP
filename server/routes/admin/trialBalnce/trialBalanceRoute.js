const express = require("express");
const verifyJwt = require("../../../middleware/verifyJwt");
const { getReceivablesFromCustomers,
    // getSupplierPayables,
    getReceivablesFromEmployees,
    getMarketFeesFromSuppliers,
      getCommissionsFromSuppliers,
      getCoolieFromSuppliers,
      getCashBalance,
      // getPayablesToSuppliers,
      getLenderPayables,
      getSupplierBalances

} = require("../../../controllers/admin/trialBalance/balanceController");

const router = express.Router();

router.get("/receivable", verifyJwt, getReceivablesFromCustomers);
// router.get("/suppliers", verifyJwt,getSupplierPayables );
router.get('/employee',verifyJwt, getReceivablesFromEmployees);
router.get('/marketfee',verifyJwt,getMarketFeesFromSuppliers);
router.get('/cashbalance',verifyJwt, getCashBalance);
router.get('/commission',verifyJwt,getCommissionsFromSuppliers)
router.get('/coolie', verifyJwt,getCoolieFromSuppliers);
router.get('/lender',verifyJwt,getLenderPayables)
router.get('/supplierbalance',verifyJwt,getSupplierBalances)
// router.get('/pay',verifyJwt,getPayablesToSuppliers)
module.exports = router;

const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { getCashbookData } = require("../../../controllers/admin/cashbook/adminCashbook")
const {getCashbookSummary} = require("../../../controllers/admin/cashbook/totalCashbook")
const router=express.Router()

router.get("/report",verifyJwt,getCashbookData);
router.get ("/summary",verifyJwt,getCashbookSummary);
module.exports=router
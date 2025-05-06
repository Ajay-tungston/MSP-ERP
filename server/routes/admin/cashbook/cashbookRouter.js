const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { getCashbookData } = require("../../../controllers/admin/cashbook/adminCashbook")
const router=express.Router()

router.get("/report",verifyJwt,getCashbookData)
module.exports=router
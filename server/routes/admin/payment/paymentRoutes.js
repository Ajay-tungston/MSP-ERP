const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { addPayment } = require("../../../controllers/admin/payment/paymentController")
const router=express.Router()

router.post("/add",verifyJwt,addPayment)


module.exports=router
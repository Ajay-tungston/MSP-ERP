const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { addPayment, getAllPayments } = require("../../../controllers/admin/payment/paymentController")
const router=express.Router()

router.post("/add",verifyJwt,addPayment)
router.get("/",verifyJwt,getAllPayments)


module.exports=router
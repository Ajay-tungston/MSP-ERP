const express=require("express")
const PurchaseEntry = require("../../../models/PurchaseEntry")
const verifyJwt = require("../../../middleware/verifyJwt")
const { createPurchaseEntry, getAllPurchaseEntries, getPurchaseCounter } = require("../../../controllers/admin/purchse/purchaseController")
const router=express.Router()

router.post("/add",verifyJwt,createPurchaseEntry)
router.get("/",verifyJwt,getAllPurchaseEntries)
router.get("/count",verifyJwt,getPurchaseCounter)

module.exports=router
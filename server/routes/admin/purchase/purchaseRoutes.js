const express=require("express")
const PurchaseEntry = require("../../../models/PurchaseEntry")
const verifyJwt = require("../../../middleware/verifyJwt")
const { createPurchaseEntry, getAllPurchaseEntries, getPurchaseCounter, getIncompletePurchases, getPurchaseById,getTotalPurchaseStats } = require("../../../controllers/admin/purchse/purchaseController")
const router=express.Router()

router.post("/add",verifyJwt,createPurchaseEntry)
router.get("/",verifyJwt,getAllPurchaseEntries)
router.get("/totalStats",verifyJwt,getTotalPurchaseStats)
router.get("/count",verifyJwt,getPurchaseCounter)
router.get("/incomplete",verifyJwt,getIncompletePurchases)
router.get("/get/:id",verifyJwt,getPurchaseById)

module.exports=router
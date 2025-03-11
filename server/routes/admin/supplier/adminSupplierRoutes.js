const express=require("express")
const { addNewSupplier, getAllSuppliers, deleteSuppliers } = require("../../../controllers/admin/supplier/adminSupplierController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt ,addNewSupplier)
router.get("/",verifyJwt,getAllSuppliers)
router.delete("/",verifyJwt,deleteSuppliers)

module.exports=router
const express=require("express")
const { addNewSupplier, getAllSuppliers, deleteSuppliers, getSupplierList, updateSupplier, getSingleSupplier } = require("../../../controllers/admin/supplier/adminSupplierController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt ,addNewSupplier)
router.get("/",verifyJwt,getAllSuppliers)
router.delete("/",verifyJwt,deleteSuppliers)
router.get("/list",verifyJwt,getSupplierList)
router.put("/update/:id",verifyJwt,updateSupplier)
router.get("/singlesupplier/:id",verifyJwt,getSingleSupplier)



module.exports=router
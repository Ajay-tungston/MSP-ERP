const express=require("express")
const { addNewSupplier, getAllSuppliers, deleteSupplier, getSupplierList, updateSupplier, getSingleSupplier, getSupplierAdvance } = require("../../../controllers/admin/supplier/adminSupplierController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt ,addNewSupplier)
router.get("/",verifyJwt,getAllSuppliers)
router.delete("/delete/:id",verifyJwt,deleteSupplier)
router.get("/list",verifyJwt,getSupplierList)
router.put("/update/:id",verifyJwt,updateSupplier)
router.get("/singlesupplier/:id",verifyJwt,getSingleSupplier)
router.get("/advance/:id",verifyJwt,getSupplierAdvance)



module.exports=router
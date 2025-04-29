const express=require("express")
const { addItem, getAllItems, deleteItems, getItemById } = require("../../../controllers/admin/item/adminItemController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt,addItem)
router.get("/",verifyJwt,getAllItems)
router.delete("/",verifyJwt,deleteItems)
router.get("/get/:id",verifyJwt,getItemById)

module.exports=router
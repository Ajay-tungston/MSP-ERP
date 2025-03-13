const express=require("express")
const { addItem, getAllItems, deleteItems } = require("../../../controllers/admin/item/adminItemController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt,addItem)
router.get("/",verifyJwt,getAllItems)
router.delete("/",verifyJwt,deleteItems)

module.exports=router
const express=require("express")
const { addItem, getAllItems, deleteItems, getItemList } = require("../../../controllers/admin/item/adminItemController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt,addItem)
router.get("/",verifyJwt,getAllItems)
router.delete("/",verifyJwt,deleteItems)
router.get("/list",getItemList)

module.exports=router
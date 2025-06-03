const express=require("express")
const { addItem, getAllItems, deleteItem, getItemList, updateItem, getItemById } = require("../../../controllers/admin/item/adminItemController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt,addItem)
router.get("/get",verifyJwt,getAllItems)
router.delete("/delete/:id",verifyJwt,deleteItem)
router.get("/list",verifyJwt,getItemList)
router.put("/update/:itemId",verifyJwt, updateItem);
router.get('/get/:itemId',verifyJwt, getItemById);

module.exports=router
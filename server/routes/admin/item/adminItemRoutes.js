const express=require("express")
const { addItem, getAllItems, deleteItem, getItemList, updateItem, getItemById } = require("../../../controllers/admin/item/adminItemController")
const verifyJwt = require("../../../middleware/verifyJwt")
const router=express.Router()

router.post("/add",verifyJwt,addItem)
router.get("/get",verifyJwt,getAllItems)
router.delete("/delete/:id",verifyJwt,deleteItem)
router.get("/list",getItemList)
router.put("/update/:itemId", updateItem);
router.get('/get/:itemId', getItemById);

module.exports=router
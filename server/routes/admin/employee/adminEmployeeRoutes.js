const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { addNewEmployee } = require("../../../controllers/admin/employee/adminEmployeeController")
const router=express.Router()

router.post("/add",verifyJwt ,addNewEmployee)


module.exports=router
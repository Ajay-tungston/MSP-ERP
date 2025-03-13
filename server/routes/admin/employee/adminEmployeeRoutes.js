const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { addNewEmployee, getAllEmployees, deleteEmployees } = require("../../../controllers/admin/employee/adminEmployeeController")
const router=express.Router()

router.post("/add",verifyJwt ,addNewEmployee)
router.get("/",verifyJwt ,getAllEmployees)
router.delete("/",verifyJwt ,deleteEmployees)


module.exports=router
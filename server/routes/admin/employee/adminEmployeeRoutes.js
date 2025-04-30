const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { addNewEmployee, getAllEmployees, deleteEmployees, getEmployeeList } = require("../../../controllers/admin/employee/adminEmployeeController")
const router=express.Router()

router.post("/add",verifyJwt ,addNewEmployee)
router.get("/",verifyJwt ,getAllEmployees)
router.delete("/",verifyJwt ,deleteEmployees)
router.get("/list",verifyJwt,getEmployeeList)



module.exports=router
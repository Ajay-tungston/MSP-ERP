const express=require("express")
const verifyJwt = require("../../../middleware/verifyJwt")
const { addNewEmployee, getAllEmployees, deleteEmployees, getEmployeeList,getSingleEmployee,
    updateEmployee } = require("../../../controllers/admin/employee/adminEmployeeController")
const router=express.Router()

router.post("/add",verifyJwt ,addNewEmployee)
router.get("/",verifyJwt ,getAllEmployees)
router.delete("/",verifyJwt ,deleteEmployees)
router.get("/list",verifyJwt,getEmployeeList)
router.get("/get/:id", getSingleEmployee); // NEW
router.put("/update/:id", updateEmployee); // NEW


module.exports=router
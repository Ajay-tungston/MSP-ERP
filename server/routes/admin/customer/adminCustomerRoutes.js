const express=require("express");
const {addNewCustomer, getAllCustomers, deleteCustomer,getCustomerNames,updateCustomer, getSingleCustomer}=require('../../../controllers/admin/customer/adminCustomerController');
const verifyJwt = require("../../../middleware/verifyJwt");
const router=express.Router()

router.post('/add', verifyJwt,addNewCustomer);
router.get('/get',verifyJwt ,getAllCustomers);
router.delete('/delete/:id',verifyJwt ,deleteCustomer);
router.get('/getname',verifyJwt ,getCustomerNames);
router.put('/update/:customerId',verifyJwt ,updateCustomer);
router.get('/get/:customerId',verifyJwt ,getSingleCustomer);

module.exports=router
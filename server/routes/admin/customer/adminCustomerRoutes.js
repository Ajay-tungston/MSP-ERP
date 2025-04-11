const express=require("express");
const {addNewCustomer, getAllCustomers, deleteCustomer}=require('../../../controllers/admin/customer/adminCustomerController');
const verifyJwt = require("../../../middleware/verifyJwt");
const router=express.Router()

router.post('/add', verifyJwt,addNewCustomer);
router.get('/get',verifyJwt ,getAllCustomers);
router.delete('/delete/:id',verifyJwt ,deleteCustomer);

module.exports=router
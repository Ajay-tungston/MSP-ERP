const express=require("express");
const {addNewCustomer, getAllCustomers, deleteCustomer, editCustomer, getCustomerById}=require('../../../controllers/admin/customer/adminCustomerController');
const verifyJwt = require("../../../middleware/verifyJwt");
const router=express.Router()

router.post('/add', verifyJwt,addNewCustomer);
router.get('/get',verifyJwt ,getAllCustomers);
router.delete('/delete/:id',verifyJwt ,deleteCustomer);
router.put('/edit/:id', verifyJwt,editCustomer);
router.get('/get/:id', verifyJwt,getCustomerById);

module.exports=router
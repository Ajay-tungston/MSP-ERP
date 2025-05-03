const express = require("express");
const salesEntry = require("../../../models/SalesEntry");
const {
  createSaleTransaction,getSalesEntries,
  getCustomerSalesReport,
  getCustomerSalesByDate,
} = require("../../../controllers/admin/sales/salesController");
const verifyJwt = require("../../../middleware/verifyJwt");
const router = express.Router();

router.post("/add", verifyJwt, createSaleTransaction);
router.get("/get", verifyJwt, getSalesEntries);
router.get("/salesindividual",verifyJwt, getCustomerSalesReport)
router.get("/getbydate",verifyJwt, getCustomerSalesByDate)
module.exports = router;

const express = require("express");
const {
  addCompany,
  getAllCompanies,
  deleteCompanies,
} = require("../../../controllers/admin/company/adminCompany");
const verifyJwt = require("../../../middleware/verifyJwt");

const router = express.Router();

// Add a new company
router.post("/add", verifyJwt, addCompany);

// Get all companies (with optional pagination)
router.get("/get", verifyJwt, getAllCompanies);

// Delete companies by ID array
router.delete("/delete", verifyJwt, deleteCompanies);

module.exports = router;

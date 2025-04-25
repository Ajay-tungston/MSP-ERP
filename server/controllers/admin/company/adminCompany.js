const Company = require("../../../models/Company");
const validator = require("validator");

// Helper to validate DD/MM/YYYY format
const isValidDate = (dateStr) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(dateStr)) return false;

  const [day, month, year] = dateStr.split("/");
  const date = new Date(`${year}-${month}-${day}`);
  return (
    date.getDate() === parseInt(day) &&
    date.getMonth() + 1 === parseInt(month) &&
    date.getFullYear() === parseInt(year)
  );
};

// POST: Add Company
const addCompany = async (req, res) => {
  try {
    const { date, companyCapital, openingCash ,companyName} = req.body;

    // Validate fields
    if (!date || !companyCapital || !openingCash || !companyName) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({
        message: "Date must be valid and in DD/MM/YYYY format",
      });
    }

    if (!validator.isNumeric(companyCapital.toString())) {
      return res.status(400).json({
        message: "Company capital must be a number",
      });
    }

    if (!validator.isNumeric(openingCash.toString())) {
      return res.status(400).json({
        message: "Opening cash must be a number",
      });
    }
    
    // Create company
    const company = await Company.create({
      date,
      companyCapital,
      openingCash,
      companyName,
    });

    return res.status(201).json({ company });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add company" });
  }
};

// GET: Get all companies (optional: pagination)
const getAllCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Company.countDocuments();
    const companies = await Company.find().skip(skip).limit(limit);

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching companies" });
  }
};

// DELETE: Remove companies by ID
const deleteCompanies = async (req, res) => {
  try {
    const { companyIds } = req.body;

    if (!Array.isArray(companyIds) || companyIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid list of company IDs." });
    }

    const result = await Company.deleteMany({ _id: { $in: companyIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res
      .status(200)
      .json({ message: `${result.deletedCount} companies deleted successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting companies" });
  }
};

module.exports = {
  addCompany,
  getAllCompanies,
  deleteCompanies,
};

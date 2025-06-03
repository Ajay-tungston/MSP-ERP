const validator = require("validator");
const Employee = require("../../../models/Employee");
const Payment = require("../../../models/Payment");

const addNewEmployee = async (req, res) => {
  try {
    const {
      employeeName,
      address,
      phone,
      whatsapp,
      openingBalance,
      joiningDate,
      salary,
      salaryType
    } = req.body;

    if (!employeeName || !phone || !salary || !salaryType) {
      return res
        .status(400)
        .json({ message: "Employee name, phone, salary and salaryType are required." });
    }

    const existingEmployee = await Employee.findOne({ employeeName });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exist." });
    }

    if (!["monthly", "daily"].includes(salaryType)) {
      return res.status(400).json({ message: "Invalid salary type." });
    }

    if (
      !validator.isAlphanumeric(employeeName, "en-US", { ignore: " " }) ||
      employeeName.length < 3 ||
      employeeName.length > 100
    ) {
      return res.status(400).json({
        message:
          "employee name should be alphanumeric and between 3 to 100 characters long",
      });
    }

    if (address && (address.length < 5 || address.length > 200)) {
      return res
        .status(400)
        .json({ message: "Address must be between 5 and 200 characters long" });
    }

    if (
      !validator.isMobilePhone(phone, "any", { strictMode: false }) ||
      phone.length !== 10
    ) {
      return res.status(400).json({
        message: "Invalid phone number format, it should be 10 digits",
      });
    }

    if (
      whatsapp &&
      (!validator.isMobilePhone(whatsapp, "any", { strictMode: false }) ||
        whatsapp.length !== 10)
    ) {
      return res.status(400).json({
        message: "Invalid WhatsApp number format. It must be 10 digits.",
      });
    }

    if (!validator.isNumeric(salary.toString()) || salary <= 0) {
      return res
        .status(400)
        .json({ message: "Salary must be a valid positive number." });
    }

    if (openingBalance && (isNaN(openingBalance) || openingBalance < 0)) {
      return res
        .status(400)
        .json({ message: "Opening balance must be a valid positive number." });
    }

    if (
      joiningDate &&
      (!validator.isISO8601(joiningDate) || new Date(joiningDate) > new Date())
    ) {
      return res.status(400).json({
        message:
          "Joining date must be a valid date and cannot be in the future.",
      });
    }

    const newEmployee = new Employee({
      employeeName,
      address,
      phone,
      whatsapp,
      openingBalance,
      joiningDate,
      salary,
      salaryType
    });
    await newEmployee.save();
    return res
      .status(201)
      .json({ message: "Employee created successfully", newEmployee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = {
      employeeName: { $regex: search, $options: "i" }
    };

    const totalEmployee = await Employee.countDocuments(searchQuery);

    if (totalEmployee === 0) {
      return res.status(200).json({
        currentPage: page,
        totalPages: 0,
        totalEmployee: 0,
        employees: [],
      });
    }

    const employees = await Employee.find(searchQuery)
      .sort({ joiningDate: -1 })  // ✅ Sort by joiningDate DESC
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalEmployee / limit),
      totalEmployee,
      employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting employees" });
  }
};


const getEmployeeList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
  ? { employeeName: { $regex: search, $options: "i" } }
  : {};
    const employee = await Employee.find(query)
    // .select(
    //   "supplierName supplierCode commission marketFee"
    // );
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting employee" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if employee exists
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Check if the employee has any linked payments
    const hasPayments = await Payment.exists({
      category: "employee",
      employee: id,
    });

    if (hasPayments) {
      return res.status(400).json({
        message: "Cannot delete: This employee is linked with one or more payments.",
      });
    }

    // Safe to delete
    await Employee.findByIdAndDelete(id);

    return res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// GET single employee by ID
const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching employee." });
  }
};

// PUT update employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employeeName,
      address,
      phone,
      whatsapp,
      openingBalance,
      joiningDate,
      salary,
      salaryType,
    } = req.body;

    // Validate inputs
    if (!employeeName || !phone || !salary || !salaryType) {
      return res.status(400).json({
        message: "Employee name, phone, salary and salaryType are required.",
      });
    }

    if (!["monthly", "daily"].includes(salaryType)) {
      return res.status(400).json({ message: "Invalid salary type." });
    }

    if (
      !validator.isAlphanumeric(employeeName, "en-US", { ignore: " " }) ||
      employeeName.length < 3 ||
      employeeName.length > 100
    ) {
      return res.status(400).json({
        message:
          "Employee name should be alphanumeric and between 3 to 100 characters long",
      });
    }

    if (address && (address.length < 5 || address.length > 200)) {
      return res.status(400).json({
        message: "Address must be between 5 and 200 characters long",
      });
    }

    if (
      !validator.isMobilePhone(phone, "any", { strictMode: false }) ||
      phone.length !== 10
    ) {
      return res.status(400).json({
        message: "Invalid phone number format. It should be 10 digits.",
      });
    }

    if (
      whatsapp &&
      (!validator.isMobilePhone(whatsapp, "any", { strictMode: false }) ||
        whatsapp.length !== 10)
    ) {
      return res.status(400).json({
        message: "Invalid WhatsApp number format. It must be 10 digits.",
      });
    }

    if (!validator.isNumeric(salary.toString()) || salary <= 0) {
      return res
        .status(400)
        .json({ message: "Salary must be a valid positive number." });
    }

    if (openingBalance && (isNaN(openingBalance) || openingBalance < 0)) {
      return res.status(400).json({
        message: "Opening balance must be a valid positive number.",
      });
    }

    if (
      joiningDate &&
      (!validator.isISO8601(joiningDate) || new Date(joiningDate) > new Date())
    ) {
      return res.status(400).json({
        message: "Joining date must be a valid date and not in the future.",
      });
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        employeeName,
        address,
        phone,
        whatsapp,
        openingBalance,
        joiningDate,
        salary,
        salaryType,
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    return res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = 
{ addNewEmployee, 
  getAllEmployees,
  deleteEmployee,
  getEmployeeList , 
   getSingleEmployee,  // NEW
  updateEmployee   };

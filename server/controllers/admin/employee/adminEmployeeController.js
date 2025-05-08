const validator = require("validator");
const Employee = require("../../../models/Employee");

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
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 10;
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

    const employees = await Employee.find(searchQuery).skip(skip).limit(limit);

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

const deleteEmployees = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!Array.isArray(employeeId) || employeeId.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid list of employee IDs." });
    }
    const result = await Employee.deleteMany({ _id: { $in: employeeId } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "employee not found" });
    }

    return res.status(200).json({
      message: `${result.deletedCount} employees deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting employees" });
  }
};

module.exports = { addNewEmployee, getAllEmployees,deleteEmployees,getEmployeeList };

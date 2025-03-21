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
    } = req.body;

    if (!employeeName || !phone || !salary) {
      return res
        .status(400)
        .json({ message: "Employee name, phone, and salary are required." });
    }

    const existingEmployee = await Employee.findOne({ employeeName });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exist." });
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
    });
    await newEmployee.save();
    return res.status(201).json({ message: "Employee created successfully" ,newEmployee});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports={addNewEmployee}

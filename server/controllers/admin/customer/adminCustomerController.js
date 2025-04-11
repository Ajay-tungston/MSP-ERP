const validator = require("validator");
const Customer = require("../../../models/Customer"); // Import your Customer model
const getNextCounterNumber = require("../../../utils/counter");
const addNewCustomer = async (req, res) => {
  try {
    const {
      customerName,
      address,
      phone,
      whatsapp,
      discount = 0,
      discountApplied = "manual",
      openingBalance = 0,
      routeCustomer = false,
      routeAddress = ""
    } = req.body;

    // Validate required fields
    if (!customerName || !phone || !address) {
      return res.status(400).json({
        message: "Customer name, phone, and address are required."
      });
    }

    // Validate customerName
    if (
      !validator.isAlphanumeric(customerName, "en-US", { ignore: " " }) ||
      customerName.length < 3 ||
      customerName.length > 100
    ) {
      return res.status(400).json({
        message: "Customer name should be alphanumeric and between 3 to 100 characters long."
      });
    }

    // Validate address
    if (address.length < 5 || address.length > 200) {
      return res.status(400).json({ 
        message: "Address must be between 5 and 200 characters long." 
      });
    }

    // Validate phone number
    if (!validator.isMobilePhone(phone, "any", { strictMode: false }) || phone.length !== 10) {
      return res.status(400).json({ 
        message: "Invalid phone number format. It must be 10 digits." 
      });
    }

    // Validate WhatsApp number
    if (whatsapp && (!validator.isMobilePhone(whatsapp, "any", { strictMode: false }) || whatsapp.length !== 10)) {
      return res.status(400).json({ 
        message: "Invalid WhatsApp number format. It must be 10 digits." 
      });
    }

    // Validate discount
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return res.status(400).json({ 
        message: "Discount must be a valid number between 0 and 100." 
      });
    }

    // Validate discountApplied
    if (!["weekly", "monthly", "yearly", "manual"].includes(discountApplied)) {
      return res.status(400).json({ 
        message: "Invalid discount applied type. Must be 'weekly', 'monthly', 'yearly', or 'manual'." 
      });
    }

    // Validate openingBalance
    if (isNaN(openingBalance)) {
      return res.status(400).json({ 
        message: "Opening balance must be a valid number." 
      });
    }

    // Validate routeCustomer and routeAddress
    if (typeof routeCustomer !== "boolean") {
      return res.status(400).json({ 
        message: "routeCustomer must be true or false." 
      });
    }

    if (routeCustomer && !routeAddress.trim()) {
      return res.status(400).json({ 
        message: "Route address is required for route customers." 
      });
    }

    // Check for existing customer (by name or phone)
    const existingCustomer = await Customer.findOne({ 
      $or: [{ customerName }, { phone }] 
    });
    
    if (existingCustomer) {
      const field = existingCustomer.customerName === customerName ? "name" : "phone";
      return res.status(400).json({ 
        message: `Customer with this ${field} already exists.` 
      });
    }

    // Create new customer
    const newCustomer = new Customer({
      customerName,
      address,
      phone,
      whatsapp,
      discount,
      discountApplied,
      openingBalance,
      routeCustomer,
      routeAddress: routeCustomer ? routeAddress : ""
    });

    await newCustomer.save();

    return res.status(201).json({
      message: "Customer added successfully",
      customer: newCustomer
    });

  } catch (error) {
    console.error("Error adding customer:", error);
    
    if (error.code === 11000) { // MongoDB duplicate key error
      return res.status(400).json({ 
        message: "A customer with this phone number already exists." 
      });
    }
    
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};
const getAllCustomers = async (req, res) => {
  try {
    // Retrieve all customers from the database
    const customers = await Customer.find({});
    return res.status(200).json({ customers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the customer exists
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete the customer
    await Customer.findByIdAndDelete(id);

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { addNewCustomer,getAllCustomers, deleteCustomer };

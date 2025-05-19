const mongoose = require("mongoose");
const validator = require("validator");
const Supplier = require("../../../models/Supplier");
const Customer = require("../../../models/Customer");
const Employee = require("../../../models/Employee");
const Company = require("../../../models/Company");
const Payment = require("../../../models/Payment");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const addPayment = async (req, res) => {
  try {
    const {
      paymentType,
      category,
      supplier,
      customer,
      employee,
      company,
      otherPartyName,
      amount,
      paymentMode,
      date,
      note,
    } = req.body;

    let entity;
    // Basic Validation
    if (!paymentType || !category || !amount) {
      return res
        .status(400)
        .json({ message: "Payment type, category, and amount are required." });
    }

    if (!["PaymentIn", "PaymentOut"].includes(paymentType)) {
      return res.status(400).json({ message: "Invalid payment type." });
    }

    if (
      ![
        "supplier",
        "customer",
        "Bank",
        "employee",
        "Other",
        "company",
      ].includes(category)
    ) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (!validator.isNumeric(amount.toString(), { no_symbols: true })) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number." });
    }

    // Validate Payment Mode
    if (
      paymentMode &&
      !["Cash", "Bank", "UPI", "Cheque", "Other"].includes(paymentMode)
    ) {
      return res.status(400).json({ message: "Invalid payment mode." });
    }

    // Validate Date
    if (date && !validator.isISO8601(date)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Please use ISO 8601 format." });
    }

    // Default the date to the current date if not provided
    const paymentDate = date ? new Date(date) : new Date();

    // Category-based Validation
    if (category === "supplier") {
      if (!supplier || !isValidObjectId(supplier)) {
        return res
          .status(400)
          .json({ message: "Valid supplier ID is required." });
      }
      entity = await Supplier.findById(supplier);
      if (!entity) {
        return res.status(404).json({ message: "Supplier not found." });
      }
    }

    if (category === "customer") {
      if (!customer || !isValidObjectId(customer)) {
        return res
          .status(400)
          .json({ message: "Valid customer ID is required." });
      }
      entity = await Customer.findById(customer);
      if (!entity) {
        return res.status(404).json({ message: "Customer not found." });
      }
    }

    if (category === "employee") {
      if (!employee || !isValidObjectId(employee)) {
        return res
          .status(400)
          .json({ message: "Valid employee ID is required." });
      }
      const existingEmployee = await Employee.findById(employee);
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }
    }

    if (category === "company") {
      if (!company || !isValidObjectId(company)) {
        return res
          .status(400)
          .json({ message: "Valid company ID is required." });
      }
      const existingCompany = await Company.findById(company);
      if (!existingCompany) {
        return res.status(404).json({ message: "Company not found." });
      }
    }

    // Validate Other category (Other Party Name is required)
    if (
      category === "Other" &&
      (!otherPartyName || validator.isEmpty(otherPartyName))
    ) {
      return res.status(400).json({ message: "Other party name is required." });
    }
    if (note && note.length > 100) {
      return res.status(400).json({ message: "max note length is 100" });
    }
    // if (category === "customer" || category === "supplier") {
    //   console.log(entity);
    //   const isIncoming = paymentType === "PaymentIn";
    //   const delta = isIncoming ? -amount : amount;
    //   entity.previousBalance = entity.openingBalance;
    //   entity.openingBalance += delta;
    //   console.log(entity);
    //   console.log(amount);
    //   await entity.save();
    // }

    // Create and Save Payment
    const newPayment = new Payment({
      paymentType,
      category,
      supplier: supplier || null,
      customer: customer || null,
      employee: employee || null,
      company: company || null,
      otherPartyName: otherPartyName || null,
      amount,
      paymentMode,
      date: paymentDate,
      note,
    });

    await newPayment.save();

    res
      .status(201)
      .json({ message: "Payment added successfully.", payment: newPayment });
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, paymentType } = req.query;

    const query = {};

    if (paymentType) {
      if (!["PaymentIn", "PaymentOut"].includes(paymentType)) {
        return res.status(400).json({ message: "Invalid payment type." });
      }
      query.paymentType = paymentType;
    }

    const payments = await Payment.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate({ path: "supplier", select: "supplierName" })
      .populate({ path: "customer", select: "customerName" })
      .populate({ path: "employee", select: "employeeName" })
      .populate({ path: "company", select: "companyName" })
      .lean();

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      payments,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id)
      .populate({ path: "supplier", select: "supplierName" })
      .populate({ path: "customer", select: "customerName" })
      .populate({ path: "employee", select: "employeeName" })
      .populate({ path: "company", select: "companyName" })
      .lean();

    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { addPayment, getAllPayments, getPaymentById };

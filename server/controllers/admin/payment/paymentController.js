const mongoose = require("mongoose");
const validator = require("validator");
const Supplier = require("../../../models/Supplier");
const Customer = require("../../../models/Customer");
const Employee = require("../../../models/Employee");
const Company = require("../../../models/Company");  
const Payment = require("../../../models/Payment");  
const Lender = require("../../../models/Lender")
const Vehicle = require("../../../models/Vehicle");
const Expense = require("../../../models/Expense");


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
      lender,
      expense,
      vehicle,
      otherPartyName,
      amount,
      paymentMode,
      date,
      note,
      purpose
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

    if (!['supplier', 'customer', 'Bank', 'employee', 'Other', 'company', 'lender','expense','vehicle'].includes(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (!validator.isFloat(amount.toString(), { min: 0 })) {
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

    if (
      purpose &&
      !['salary', 'other'].includes(purpose)
    ) {
      return res.status(400).json({ message: "Invalid purpose type." });
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

    if (category === 'lender') {
      if (!lender || !isValidObjectId(req.body.lender)) {
        return res.status(400).json({ message: "Valid lender ID is required." });
      }
      const existingLender = await Lender.findById(lender);
      if (!existingLender) {
        return res.status(404).json({ message: "Lender not found." });
      }
    }
    if (category === 'expense') {
      if (!expense || !isValidObjectId(req.body.expense)) {
        return res.status(400).json({ message: "Valid expense ID is required." });
      }
      const existingexpense = await Expense.findById(expense);
      if (!existingexpense) {
        return res.status(404).json({ message: "expense not found." });
      }
    }

    if (category === "vehicle") {
      if (!req.body.vehicle || !isValidObjectId(req.body.vehicle)) {
        return res.status(400).json({ message: "Valid vehicle ID is required." });
      }
      const existingVehicle = await Vehicle.findById(req.body.vehicle);
      if (!existingVehicle) {
        return res.status(404).json({ message: "Vehicle not found." });
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
    // Create and Save Payment
    const newPayment = new Payment({
      paymentType,
      category,
      supplier: supplier || null,
      customer: customer || null,
      employee: employee || null,
      company: company || null,
      lender: lender || null,
      expense: expense || null,
      vehicle: vehicle || null,
      otherPartyName: otherPartyName || null,
      amount,
      paymentMode,
      date: paymentDate,
      note,
      purpose: category === "employee" ? purpose : undefined,
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
    const { page = 1, limit = 10, paymentType, search = "" } = req.query;

    const matchStage = {};

    if (paymentType) {
      if (!["PaymentIn", "PaymentOut"].includes(paymentType)) {
        return res.status(400).json({ message: "Invalid payment type." });
      }
      matchStage.paymentType = paymentType;
    }

    const searchRegex = new RegExp(search, "i");

    const searchConditions = [];

    if (search) {
      searchConditions.push(
        { 'supplier.supplierName': searchRegex },
        { 'customer.customerName': searchRegex },
        { 'employee.employeeName': searchRegex },
        { 'company.companyName': searchRegex },
        { 'expense.expense': searchRegex },
        { 'lender.name': searchRegex },
        { 'vehicle.vehicleName': searchRegex }
      );

      // Also search by amount if it's a number
      if (!isNaN(search)) {
        searchConditions.push({ amount: Number(search) });
      }
    }

    const aggregatePipeline = [
      { $match: matchStage },

      // Lookups
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplier',
          foreignField: '_id',
          as: 'supplier'
        }
      },
      {
        $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: { path: '$customer', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employee'
        }
      },
      {
        $unwind: { path: '$employee', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'company',
          foreignField: '_id',
          as: 'company'
        }
      },
      {
        $unwind: { path: '$company', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'expenses',
          localField: 'expense',
          foreignField: '_id',
          as: 'expense'
        }
      },
      {
        $unwind: { path: '$expense', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'lenders',
          localField: 'lender',
          foreignField: '_id',
          as: 'lender'
        }
      },
      {
        $unwind: { path: '$lender', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'pickups',
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicle'
        }
      },
      {
        $unwind: { path: '$vehicle', preserveNullAndEmptyArrays: true }
      },

      // Apply search filters
      ...(searchConditions.length > 0 ? [{ $match: { $or: searchConditions } }] : []),

      { $sort: { date: -1 } },

      // Pagination
      {
        $facet: {
          data: [
            { $skip: (Number(page) - 1) * Number(limit) },
            { $limit: Number(limit) }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ];

    const result = await Payment.aggregate(aggregatePipeline);

    const payments = result[0]?.data || [];
    const total = result[0]?.totalCount[0]?.count || 0;

    res.status(200).json({
      payments,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching payments with aggregation:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id)
      .populate({ path: 'supplier', select: 'supplierName' })
      .populate({ path: 'customer', select: 'customerName' })
      .populate({ path: 'employee', select: 'employeeName' })
      .populate({ path: 'company', select: 'companyName' })
      .populate({ path: 'expense', select: 'expense' })
    .populate({path:'lender', select: 'name'})
    .populate({path:'vehicle', select: 'vehicleName'})

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

const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid payment ID." });
    }

    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found." });
    }

    res.status(200).json({ message: "Payment deleted successfully." });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


module.exports = { addPayment, getAllPayments, getPaymentById,deletePayment };

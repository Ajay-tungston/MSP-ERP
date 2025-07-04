const validator = require("validator");
const Customer = require("../../../models/Customer"); // Import your Customer model
const getNextCounterNumber = require("../../../utils/counter");
const Payment = require("../../../models/Payment");
const SalesEntry = require("../../../models/SalesEntry");
const { default: mongoose } = require("mongoose");
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
      routeAddress = "",
    } = req.body;

    // Validate required fields
    if (!customerName || !phone || !address) {
      return res.status(400).json({
        message: "Customer name, phone, and address are required.",
      });
    }

    // Validate customerName
    if (
      !validator.isAlphanumeric(customerName, "en-US", { ignore: " " }) ||
      customerName.length < 3 ||
      customerName.length > 100
    ) {
      return res.status(400).json({
        message:
          "Customer name should be alphanumeric and between 3 to 100 characters long.",
      });
    }

    // Validate address
    if (address.length < 5 || address.length > 200) {
      return res.status(400).json({
        message: "Address must be between 5 and 200 characters long.",
      });
    }

    // Validate phone number
    if (
      !validator.isMobilePhone(phone, "any", { strictMode: false }) ||
      phone.length !== 10
    ) {
      return res.status(400).json({
        message: "Invalid phone number format. It must be 10 digits.",
      });
    }

    // Validate WhatsApp number
    if (
      whatsapp &&
      (!validator.isMobilePhone(whatsapp, "any", { strictMode: false }) ||
        whatsapp.length !== 10)
    ) {
      return res.status(400).json({
        message: "Invalid WhatsApp number format. It must be 10 digits.",
      });
    }

    // Validate discount
    if (isNaN(discount) || discount < 0 || discount > 100) {
      return res.status(400).json({
        message: "Discount must be a valid number between 0 and 100.",
      });
    }

    // Validate discountApplied
    if (!["weekly", "monthly", "yearly", "manual"].includes(discountApplied)) {
      return res.status(400).json({
        message:
          "Invalid discount applied type. Must be 'weekly', 'monthly', 'yearly', or 'manual'.",
      });
    }

    // Validate openingBalance
    if (isNaN(openingBalance)) {
      return res.status(400).json({
        message: "Opening balance must be a valid number.",
      });
    }

    // Validate routeCustomer and routeAddress
    if (typeof routeCustomer !== "boolean") {
      return res.status(400).json({
        message: "routeCustomer must be true or false.",
      });
    }

    if (routeCustomer && !routeAddress.trim()) {
      return res.status(400).json({
        message: "Route address is required for route customers.",
      });
    }

    // Check for existing customer (by name or phone)
    const existingCustomer = await Customer.findOne({
      $or: [{ customerName }, { phone }],
    });

    if (existingCustomer) {
      const field =
        existingCustomer.customerName === customerName ? "name" : "phone";
      return res.status(400).json({
        message: `Customer with this ${field} already exists.`,
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
      routeAddress: routeCustomer ? routeAddress : "",
    });

    await newCustomer.save();

    return res.status(201).json({
      message: "Customer added successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Error adding customer:", error);

    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({
        message: "A customer with this phone number already exists.",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
const getAllCustomers = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    search = search?.trim() || "";

    const skip = (page - 1) * limit;

    // 🔍 Search by customer name only
    const searchQuery = search
      ? { customerName: { $regex: search, $options: "i" } }
      : {};

    const customersPromise = Customer.find(searchQuery)
      .sort({ createdAt: -1 }) // 🔽 sort by most recent
      .skip(skip)
      .limit(limit);

    const totalPromise = Customer.countDocuments(searchQuery);

    const [customers, total] = await Promise.all([
      customersPromise,
      totalPromise,
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      customers,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Make sure to export all controllers as needed

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer exists
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if customer is referenced in any sales
    const hasSales = await SalesEntry.exists({ "customers.customer": id });
    if (hasSales) {
      return res.status(400).json({
        message: "Cannot delete customer with existing sales records.",
      });
    }

    // Check if customer is referenced in any payments
    const hasPayments = await Payment.exists({ customer: id });
    if (hasPayments) {
      return res.status(400).json({
        message: "Cannot delete customer with existing payment records.",
      });
    }

    // No references found, safe to delete
    await Customer.findByIdAndDelete(id);
    return res.status(200).json({ message: "Customer deleted successfully." });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getCustomerNames = async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};

    if (q && q.trim()) {
      filter.customerName = {
        $regex: escapeRegex(q.trim()),
        $options: "i",
      };
    }

    const customers = await Customer.find(
      filter,
      "customerName address whatsapp openingBalance"
    )
      .sort({ customerName: 1 })
      .limit(100) // Prevent excessive results
      .lean() // Faster if just converting to objects
      .exec();
    const customerList = customers.map((c) => ({
      id: c._id,
      name: c.customerName,
      address: c.address,
      whatsapp: c?.whatsapp,
      openingBalance: c.openingBalance,
    }));
    return res.status(200).json({
      success: true,
      count: customerList.length,
      customers: customerList,
    });
  } catch (error) {
    console.error("Error fetching customer names:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params; // Get the customerId from the request parameters
    const updates = req.body; // Get the updates from the request body

    // Make sure the customer exists before attempting to update
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ message: `Customer with ID ${customerId} not found` });
    }

    // Apply the updates to the customer document
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        customer[key] = updates[key];
      }
    });

    // Save the updated customer document to the database
    await customer.save();

    return res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSingleCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Validate customerId
    if (!customerId || customerId === "undefined") {
      return res
        .status(400)
        .json({ message: "Invalid or missing customer ID" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCustomerReport = async (req, res) => {
  try {
    const {
      customerId,
      startDate,
      endDate,
      page = 1,
      limit = 20,
      noPagination = false,
    } = req.query;

    if (!customerId || !startDate || !endDate) {
      return res.status(400).json({
        message: "customerId, startDate, and endDate are required",
      });
    }

    const customerObjectId = new mongoose.Types.ObjectId(customerId);
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // --- 1. Previous Sales Total ---
    const previousSales = await SalesEntry.aggregate([
      {
        $match: {
          dateOfSale: { $lt: start },
          "customers.customer": customerObjectId,
        },
      },
      { $unwind: "$customers" },
      { $match: { "customers.customer": customerObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$customers.totalAmount" },
        },
      },
    ]);
    const previousSalesTotal = previousSales[0]?.total || 0;

    // --- 2. Previous Payments Total ---
    const previousPayments = await Payment.aggregate([
      {
        $match: {
          customer: customerObjectId,
          category: "customer",
          date: { $lt: start },
        },
      },
      {
        $group: {
          _id: "$paymentType",
          total: { $sum: "$amount" },
        },
      },
    ]);
    let paymentInBefore = 0,
      paymentOutBefore = 0;
    previousPayments.forEach((p) => {
      if (p._id === "PaymentIn") paymentInBefore = p.total;
      if (p._id === "PaymentOut") paymentOutBefore = p.total;
    });

    // --- 3. Opening Balance & Previous Balance ---
    const customerDoc = await Customer.findById(customerObjectId).select(
      "openingBalance"
    );
    const openingBalance = customerDoc?.openingBalance || 0;
    const previousBalance =
      openingBalance +
      (previousSalesTotal - paymentInBefore + paymentOutBefore);

    // --- 4. Count Total Items (for pagination only) ---
    let totalItems = 0;
    let totalPages = 0;
    const pageNum = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (pageNum - 1) * pageLimit;

    if (noPagination !== "true") {
      const countResult = await SalesEntry.aggregate([
        {
          $match: {
            dateOfSale: { $gte: start, $lte: end },
            "customers.customer": customerObjectId,
          },
        },
        { $unwind: "$customers" },
        { $match: { "customers.customer": customerObjectId } },
        {
          $project: { date: "$dateOfSale" },
        },
        {
          $unionWith: {
            coll: "payments",
            pipeline: [
              {
                $match: {
                  customer: customerObjectId,
                  category: "customer",
                  date: { $gte: start, $lte: end },
                },
              },
              { $project: { date: "$date" } },
            ],
          },
        },
        { $count: "total" },
      ]);
      totalItems = countResult[0]?.total || 0;
      totalPages = Math.ceil(totalItems / pageLimit);
    }

    // --- 5. Timeline (paginated or full based on noPagination) ---
    const timelineAggregation = [
      {
        $match: {
          dateOfSale: { $gte: start, $lte: end },
          "customers.customer": customerObjectId,
        },
      },
      { $unwind: "$customers" },
      { $match: { "customers.customer": customerObjectId } },
      {
        $project: {
          _id: 0,
          type: { $literal: "sale" },
          transactionNumber: "$transactionNumber",
          date: "$dateOfSale",
          amount: "$customers.totalAmount",
          discount: "$customers.discount",
          items: "$customers.items",
        },
      },
      {
        $unionWith: {
          coll: "payments",
          pipeline: [
            {
              $match: {
                customer: customerObjectId,
                category: "customer",
                date: { $gte: start, $lte: end },
              },
            },
            {
              $project: {
                _id: 0,
                type: { $literal: "payment" },
                date: "$date",
                amount: "$amount",
                paymentType: "$paymentType",
                paymentMode: "$paymentMode",
                note: "$note",
              },
            },
          ],
        },
      },
      { $sort: { date: 1 } },
    ];

    if (noPagination !== "true") {
      timelineAggregation.push({ $skip: skip }, { $limit: pageLimit });
    }

    const timeline = await SalesEntry.aggregate(timelineAggregation);

    // --- 6. Summary for the full date range (not paginated) ---
    const summaryResults = await SalesEntry.aggregate([
      {
        $match: {
          dateOfSale: { $gte: start, $lte: end },
          "customers.customer": customerObjectId,
        },
      },
      { $unwind: "$customers" },
      { $match: { "customers.customer": customerObjectId } },
      {
        $project: {
          amount: "$customers.totalAmount",
        },
      },
      {
        $unionWith: {
          coll: "payments",
          pipeline: [
            {
              $match: {
                customer: customerObjectId,
                category: "customer",
                date: { $gte: start, $lte: end },
              },
            },
            {
              $project: {
                amount: "$amount",
                paymentType: "$paymentType",
              },
            },
          ],
        },
      },
    ]);

    let totalDebit = 0;
    let totalCredit = 0;

    summaryResults.forEach((entry) => {
      if (entry.paymentType === "PaymentOut") {
        totalDebit += entry.amount;
      } else if (entry.paymentType === "PaymentIn") {
        totalCredit += entry.amount;
      } else {
        totalDebit += entry.amount; // sales
      }
    });

    const closingBalance = previousBalance + totalDebit - totalCredit;

    // --- 7. Final Response ---
    const response = {
      customerId,
      dateRange: { startDate, endDate },
      openingBalance,
      previousBalance,
      timeline,
      summaryTotals: {
        totalDebit,
        totalCredit,
        closingBalance,
      },
    };

    if (noPagination !== "true") {
      response.page = pageNum;
      response.limit = pageLimit;
      response.totalItems = totalItems;
      response.totalPages = totalPages;
    }

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in getCustomerReport:", err);
    res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  addNewCustomer,
  getAllCustomers,
  deleteCustomer,
  getCustomerNames,
  updateCustomer,
  getSingleCustomer,
  getCustomerReport,
};

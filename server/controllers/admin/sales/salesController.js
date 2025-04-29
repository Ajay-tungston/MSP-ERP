const SalesEntry = require("../../../models/SalesEntry");
const Customer = require("../../../models/Customer");
const Supplier = require("../../../models/Supplier");
const Item = require("../../../models/Item");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const getNextCounterNumber = require("../../../utils/counter");

const mongoose = require("mongoose");

const createSaleTransaction = async (req, res) => {
  try {
    const sales = Array.isArray(req.body) ? req.body : [req.body];

    const transactionNumber = await getNextCounterNumber("saleTransaction");
    const customersArray = [];
    let grandTotal = 0;
    let totalQuantity = 0;

    for (const saleData of sales) {
      const { customerId, items, discount = 0 } = saleData;

      // Validate customer
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: `Customer ${customerId} not found` });
      }

      const customerItems = [];
      let customerTotal = 0;
      let customerQuantity = 0;

      for (const itemData of items) {
        const { itemName, supplierId, quantity, unitPrice } = itemData;

        // Validate item
        const item = await Item.findOne({ itemName });
        if (!item) {
          return res.status(404).json({ message: `Item ${itemName} not found` });
        }

        // Validate supplier
        if (!supplierId || !mongoose.Types.ObjectId.isValid(supplierId)) {
          return res.status(400).json({ message: `Invalid supplier ID: ${supplierId}` });
        }

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
          return res.status(404).json({ message: `Supplier ${supplierId} not found` });
        }

        const totalCost = unitPrice * quantity;

        customerItems.push({
          item: item._id,
          supplier: supplier._id,
          quantity,
          unitPrice,
          totalCost,
        });

        customerTotal += totalCost;
        customerQuantity += quantity;
      }

      // Push processed customer data
      customersArray.push({
        customer: customer._id,
        items: customerItems,
        discount,
        totalAmount: customerTotal - discount,
        totalQuantity: customerQuantity,
      });

      grandTotal += (customerTotal - discount);
      totalQuantity += customerQuantity;
    }

    // Create and save the sale transaction
    const newSale = new SalesEntry({
      transactionNumber,
      status: "completed",
      totalAmount: grandTotal,
      totalQuantity,
      customers: customersArray,
    });

    await newSale.save();

    return res.status(201).json({ message: "Grouped sales transaction saved", sale: newSale });

  } catch (error) {
    console.error("Sale creation error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const getSalesEntries = async (req, res) => {
  try {
    const {
      customerId,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = "dateOfSale",
      sortOrder = "desc",
    } = req.query;

    // Build query object
    const query = {};
    if (customerId) query.customer = customerId;
    if (status) query.status = status;
    if (startDate && endDate) {
      query.dateOfSale = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Calculate pagination values
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    // Build sorting object
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Fetch paginated and sorted results
    const salesEntries = await SalesEntry.find(query)
      .populate("customer", "name") // Optional: include customer name
      .populate("items.item", "itemName")
      .populate("items.supplier", "supplierName")
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Count total for frontend pagination
    const totalEntries = await SalesEntry.countDocuments(query);

    // Return paginated response
    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalEntries,
      totalPages: Math.ceil(totalEntries / pageSize),
      entries: salesEntries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sales entries." });
  }
};

module.exports = {
  createSaleTransaction,
  getSalesEntries,
};

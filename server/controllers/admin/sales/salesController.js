const SalesEntry = require("../../../models/SalesEntry");
const Customer = require("../../../models/Customer");
const Supplier = require("../../../models/Supplier");
const Item = require("../../../models/Item");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const getNextCounterNumber = require("../../../utils/counter");

const createSaleTransaction = async (req, res) => {
  try {
    const { customerId, items, discount = 0, status = "completed" } = req.body;

    // 1. Validate customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // 2. Generate new transaction number
    const transactionNumber = await getNextCounterNumber("saleTransaction");

    let totalAmount = 0;
    let totalQuantity = 0;
    const saleItems = [];

    for (const itemData of items) {
      const { itemName, supplierId, quantity, unitPrice } = itemData;

      const item = await Item.findOne({ itemName });
      if (!item) {
        return res
          .status(404)
          .json({ message: `Item "${itemName}" not found` });
      }

      const supplier = await Supplier.findById(supplierId);
      if (!supplier) {
        return res
          .status(404)
          .json({ message: `Supplier with ID ${supplierId} not found` });
      }

      const totalCost = unitPrice * quantity;

      saleItems.push({
        item: item._id,
        supplier: supplier._id,
        quantity,
        unitPrice,
        totalCost,
      });

      totalAmount += totalCost;
      totalQuantity += quantity;

      // Optional: Deduct from inventory (PurchaseEntry logic here if needed)
    }

    // 3. Apply discount
    const finalAmount = totalAmount - discount;

    const newSale = new SalesEntry({
      transactionNumber,
      customer: customer._id,
      items: saleItems,
      totalAmount: finalAmount,
      totalQuantity,
      discount,
      status,
    });

    await newSale.save();

    return res
      .status(201)
      .json({ message: "Sale transaction recorded", sale: newSale });
  } catch (error) {
    console.error("Sale creation error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSalesEntries = async (req, res) => {
  try {
    const { customerId, status, startDate, endDate, page = 1, limit = 10, sortBy = "dateOfSale", sortOrder = "desc" } = req.query;

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

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
    let grandTotal     = 0;
    let grandQuantity  = 0;

    for (const saleData of sales) {
      const { customerId, items, discount = 0 } = saleData;

      // 1) Validate customer
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: `Customer ${customerId} not found` });
      }

      const customerItems = [];
      let   customerTotal    = 0;
      let   customerQuantity = 0;

      // 2) For each item sold, deduct from the matching Purchase
      for (const itemData of items) {
        const { itemName, supplierId, quantity, unitPrice } = itemData;

        // 2a) Validate item & supplier
        const item = await Item.findOne({ itemName });
        if (!item) {
          return res.status(404).json({ message: `Item ${itemName} not found` });
        }
        if (!supplierId || !mongoose.Types.ObjectId.isValid(supplierId)) {
          return res.status(400).json({ message: `Invalid supplier ID: ${supplierId}` });
        }
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
          return res.status(404).json({ message: `Supplier ${supplierId} not found` });
        }

        // 2b) STEP 1: Atomically decrement soldQuantity & remainingQuantity
        const updatedPurchase = await PurchaseEntry.findOneAndUpdate(
          {
            supplier:               supplier._id,
            "items.item":           item._id,
            "items.remainingQuantity": { $gte: quantity }
          },
          {
            $inc: {
              "items.$.soldQuantity":      quantity,
              "items.$.remainingQuantity": -quantity
            }
          },
          { new: true }
        );

        if (!updatedPurchase) {
          return res.status(400).json({
            message: `Only limited stock for ${itemName} from this supplier`
          });
        }

        // 2c) Locate the updated sub-document
        const purchaseItem = updatedPurchase.items.find(pi =>
          pi.item.toString() === item._id.toString()
        );

        // 2d) STEP 2: Mark that item completed if it hit zero
        if (purchaseItem.remainingQuantity === 0 && !purchaseItem.isCompleted) {
          await PurchaseEntry.updateOne(
            { _id: updatedPurchase._id, "items._id": purchaseItem._id },
            { $set: { "items.$.isCompleted": true } }
          );
        }

        // 2e) STEP 3: If *all* sub-items are done, mark whole purchase completed
        const fresh = await PurchaseEntry.findById(updatedPurchase._id).select("items isCompleted");
        if (!fresh.isCompleted && fresh.items.every(i => i.isCompleted)) {
          await PurchaseEntry.updateOne(
            { _id: updatedPurchase._id },
            { $set: { isCompleted: true } }
          );
        }

        // 2f) Record this sale‐line
        const totalCost = unitPrice * quantity;
        customerItems.push({
          item:      item._id,
          supplier:  supplier._id,
          quantity,
          unitPrice,
          totalCost
        });
        customerTotal    += totalCost;
        customerQuantity += quantity;
      }

      // 3) Build customer‐level entry
      customersArray.push({
        customer:      customer._id,
        items:         customerItems,
        discount,
        totalAmount:   customerTotal - discount,
        totalQuantity: customerQuantity
      });

      grandTotal    += (customerTotal - discount);
      grandQuantity += customerQuantity;
    }

    // 4) Finally, save the grouped sale transaction
    const newSale = new SalesEntry({
      transactionNumber,
      customers:      customersArray,
      dateOfSale:     new Date(),
      totalAmount:    grandTotal,
      totalQuantity:  grandQuantity,
      status:         "completed"
    });

    await newSale.save();

    return res.status(201).json({
      message: "Grouped sales transaction saved",
      sale: newSale
    });

  } catch (error) {
    console.error("Sale creation error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error:   error.message
    });
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
      .populate("customers.customer", "customerName")
      .populate("customers.items.item", "itemName")
      .populate("customers.items.supplier", "supplierName")
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)
      .exec();

    const totalEntries = await SalesEntry.countDocuments(query);

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalEntries,
      totalPages: Math.ceil(totalEntries / pageSize),
      entries: salesEntries,
    });
  } catch (error) {
    console.error("Error fetching sales entries:", error);
    res.status(500).json({ message: "Error fetching sales entries." });
  }
};


module.exports = {
  createSaleTransaction,
  getSalesEntries,
};

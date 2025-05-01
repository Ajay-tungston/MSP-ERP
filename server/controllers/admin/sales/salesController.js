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
    let grandQuantityKg = 0;
    let grandQuantityBox = 0;

    for (const saleData of sales) {
      const { customerId, items, discount = 0 } = saleData;

      // Find the customer by ID
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: `Customer ${customerId} not found` });
      }

      const customerItems = [];
      let customerTotal = 0;
      let customerQuantityKg = 0;
      let customerQuantityBox = 0;

      for (const itemData of items) {
        const {
          itemName,
          supplierId,
          unitPrice,
          quantityKg: rawKg,
          quantityBox: rawBox
        } = itemData;
console.log(itemData)
        const quantityKg = parseFloat(rawKg) || 0;
        const quantityBox = parseFloat(rawBox) || 0;

        console.log("Received item quantities for", itemName, "=>", {
          quantityKg,
          quantityBox
        });

        // Validation checks
        if (quantityKg < 0 || quantityBox < 0) {
          return res.status(400).json({ message: `Invalid quantity values for ${itemName}` });
        }

        if (unitPrice == null || unitPrice < 0) {
          return res.status(400).json({ message: `Invalid unit price for ${itemName}` });
        }

        if (quantityKg > 0 && quantityBox > 0) {
          return res.status(400).json({ message: `You cannot select both Kg and Box for ${itemName}. Please choose one.` });
        }
        if (quantityKg ) {
          if(quantityKg=== 0  )
          return res.status(400).json({ message: `At least one of Kg or Box must be greater than 0 for ${itemName}` });
        }
        if (quantityBox ) {
          if(quantityBox=== 0  )
          return res.status(400).json({ message: `At least one of Kg or Box must be greater than 0 for ${itemName}` });
        }


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

        // Choose correct quantity to deduct
        const totalQty = quantityKg > 0 ? quantityKg : quantityBox;

        // Update the PurchaseEntry
        const updatedPurchase = await PurchaseEntry.findOneAndUpdate(
          {
            supplier: supplier._id,
            "items.item": item._id,
            "items.remainingQuantity": { $gte: totalQty }
          },
          {
            $inc: {
              "items.$.soldQuantity": totalQty,
              "items.$.remainingQuantity": -totalQty
            }
          },
          { new: true }
        );

        if (!updatedPurchase) {
          return res.status(400).json({
            message: `Only limited stock for ${itemName} from this supplier`
          });
        }

        // Mark item as completed if fully sold
        const purchaseItem = updatedPurchase.items.find(pi =>
          pi.item.toString() === item._id.toString()
        );

        if (purchaseItem.remainingQuantity === 0 && !purchaseItem.isCompleted) {
          await PurchaseEntry.updateOne(
            { _id: updatedPurchase._id, "items._id": purchaseItem._id },
            { $set: { "items.$.isCompleted": true } }
          );
        }

        // Mark whole purchase as completed if all items are completed
        const fresh = await PurchaseEntry.findById(updatedPurchase._id).select("items isCompleted");
        if (!fresh.isCompleted && fresh.items.every(i => i.isCompleted)) {
          await PurchaseEntry.updateOne(
            { _id: updatedPurchase._id },
            { $set: { isCompleted: true } }
          );
        }

        // Calculate total cost
        const totalCost = totalQty * unitPrice;

        // Add this item to customer
        customerItems.push({
          item: item._id,
          supplier: supplier._id,
          quantityKg,
          quantityBox,
          unitPrice,
          totalCost
        });

        // Update customer totals
        customerTotal += totalCost;
        customerQuantityKg += quantityKg;
        customerQuantityBox += quantityBox;
      }

      // Add customer-level data
      customersArray.push({
        customer: customer._id,
        items: customerItems,
        discount,
        totalAmount: customerTotal - discount,
        totalQuantityKg: customerQuantityKg,
        totalQuantityBox: customerQuantityBox
      });

      // Update global totals
      grandTotal += customerTotal - discount;
      grandQuantityKg += customerQuantityKg;
      grandQuantityBox += customerQuantityBox;
    }

    // Save the final transaction
    const newSale = new SalesEntry({
      transactionNumber,
      customers: customersArray,
      dateOfSale: new Date(),
      totalAmount: grandTotal,
      totalQuantityKg: grandQuantityKg,
      totalQuantityBox: grandQuantityBox,
      status: "completed"
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
      error: error.message
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

const getCustomerSalesReport = async (req, res) => {
  try {
    const { customerId, page = 1, limit = 10 } = req.query;
    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    const skip = (page - 1) * limit;
    const custObjId = new mongoose.Types.ObjectId(customerId);

    const pipeline = [
      // 1) Only sales entries containing that customer
      { $match: { "customers.customer": custObjId } },

      // 2) Unwind at the customer‐level
      { $unwind: "$customers" },
      { $match: { "customers.customer": custObjId } },

      // 3) Unwind each sold item
      { $unwind: "$customers.items" },

      // 4) Lookup Item details
      {
        $lookup: {
          from: "items",
          localField: "customers.items.item",
          foreignField: "_id",
          as: "itemInfo",
        }
      },
      // 5) Lookup Supplier details
      {
        $lookup: {
          from: "suppliers",
          localField: "customers.items.supplier",
          foreignField: "_id",
          as: "supplierInfo",
        }
      },

      // 6) Project to the shape we want
      {
        $project: {
          _id:               0,
          transactionNumber: 1,
          dateOfSale:        1,
          customer:          "$customers.customer",
          discount:          "$customers.discount",
          // Item fields
          item: {
            _id:      { $arrayElemAt: ["$itemInfo._id", 0] },
            itemName: { $arrayElemAt: ["$itemInfo.itemName", 0] },
          },
          // Supplier fields
          supplier: {
            _id:           { $arrayElemAt: ["$supplierInfo._id", 0] },
            supplierName:  { $arrayElemAt: ["$supplierInfo.supplierName", 0] },
          },
          // Sale quantity and pricing
          quantity:    "$customers.items.quantity",
          unitPrice:   "$customers.items.unitPrice",
          totalCost:   "$customers.items.totalCost",
        }
      },

      // 7) Facet for pagination + total count
      {
        $facet: {
          paginatedResults: [
            { $skip: skip },
            { $limit: parseInt(limit) }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ];

    const agg = await SalesEntry.aggregate(pipeline);
    const rows  = agg[0].paginatedResults;
    const total = agg[0].totalCount[0]?.count || 0;

    return res.json({
      page:         parseInt(page),
      limit:        parseInt(limit),
      totalEntries: total,
      totalPages:   Math.ceil(total / limit),
      entries:      rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  createSaleTransaction,
  getSalesEntries,
  getCustomerSalesReport,
};

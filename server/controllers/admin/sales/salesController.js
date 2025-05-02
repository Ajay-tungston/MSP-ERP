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
    if (sales.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one sale block is required" });
    }

    // Get next transaction number
    const transactionNumber = await getNextCounterNumber("saleTransaction");

    // Build customer blocks
    const customersArray = [];
    let grandTotal = 0;

    for (const saleData of sales) {
      const { customer: customerId, discount = 0, items, purchase } = saleData;
      const purchaseEntry = await PurchaseEntry.findById(purchase);

      if (!purchaseEntry) {
        throw new Error("Purchase entry not found");
      }

    

      // Validate customer block
      if (!mongoose.isValidObjectId(customerId)) {
        return res
          .status(400)
          .json({ message: `Invalid customer ID: ${customerId}` });
      }
      if (!Array.isArray(items) || items.length === 0) {
        return res
          .status(400)
          .json({ message: "Each sale block needs at least one item" });
      }

      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res
          .status(404)
          .json({ message: `Customer ${customerId} not found` });
      }

      let customerTotal = 0;
      const lineItems = [];

      for (const itm of items) {
        const {
          item: itemId,
          supplier: supplierId,
          quantityType,
          quantity,
          unitPrice,
        } = itm;

        if (!mongoose.isValidObjectId(itemId)) {
          return res
            .status(400)
            .json({ message: `Invalid item ID: ${itemId}` });
        }
        if (!mongoose.isValidObjectId(supplierId)) {
          return res
            .status(400)
            .json({ message: `Invalid supplier ID: ${supplierId}` });
        }
        if (!["kg", "box"].includes(quantityType)) {
          return res
            .status(400)
            .json({ message: `Invalid quantityType for item ${itemId}` });
        }
        if (typeof quantity !== "number" || quantity <= 0) {
          return res
            .status(400)
            .json({ message: `Quantity must be > 0 for item ${itemId}` });
        }
        if (typeof unitPrice !== "number" || unitPrice < 0) {
          return res
            .status(400)
            .json({ message: `Invalid unitPrice for item ${itemId}` });
        }

        const item = await Item.findById(itemId);
        if (!item) {
          return res.status(404).json({ message: `Item ${itemId} not found` });
        }

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
          return res
            .status(404)
            .json({ message: `Supplier ${supplierId} not found` });
        }

        //for updating purchase schema
        const purchaseItem = purchaseEntry.items.find(
          (i) =>
            i.item.toString() === itemId &&
            i.quantityType === quantityType
        );

        if (!purchaseItem) {
          throw new Error("Item not found in purchase entry");
        }

        // Update sold and remaining quantities
        purchaseItem.soldQuantity += quantity;
        purchaseItem.remainingQuantity = purchaseItem.quantity - purchaseItem.soldQuantity;

        // Ensure values are within valid bounds
        if (purchaseItem.remainingQuantity < 0) {
          throw new Error("Sold quantity exceeds available quantity");
        }

        // Update completion status
        purchaseItem.isCompleted = purchaseItem.remainingQuantity === 0;

        // Save the changes
        await purchaseEntry.save();
        // const updatedPurchase = await PurchaseEntry.findOneAndUpdate(
        //   {
        //     supplier: supplier._id,
        //     "items.item": item._id,
        //     "items.quantityType": quantityType,
        //     "items.remainingQuantity": { $gte: quantity }
        //   },
        //   {
        //     $inc: {
        //       "items.$[elem].soldQuantity": quantity,
        //       "items.$[elem].remainingQuantity": -quantity
        //     }
        //   },
        //   {
        //     arrayFilters: [
        //       {
        //         "elem.item": item._id,
        //         "elem.quantityType": quantityType
        //       }
        //     ],
        //     new: true
        //   }
        // );

        // if (!updatedPurchase) {
        //   return res.status(400).json({
        //     message: `Insufficient ${quantityType} stock for item ${item._id}`
        //   });
        // }

        // const sub = updatedPurchase.items.find(
        //   pi => pi.item.equals(item._id) && pi.quantityType === quantityType
        // );
        // if (sub.remainingQuantity === 0 && !sub.isCompleted) {
        //   await PurchaseEntry.updateOne(
        //     {
        //       _id: updatedPurchase._id,
        //       "items._id": sub._id,
        //       "items.quantityType": quantityType
        //     },
        //     { $set: { "items.$.isCompleted": true } }
        //   );
        // }

        // const fresh = await PurchaseEntry.findById(updatedPurchase._id).select("items isCompleted");
        // if (!fresh.isCompleted && fresh.items.every(i => i.isCompleted)) {
        //   await PurchaseEntry.updateOne(
        //     { _id: updatedPurchase._id },
        //     { $set: { isCompleted: true } }
        //   );
        // }

        

        const totalCost = quantity * unitPrice;
        customerTotal += totalCost;

        lineItems.push({
          item: item._id,
          supplier: supplier._id,
          quantityType,
          quantity,
          unitPrice,
          totalCost,
        });
      }

      customersArray.push({
        customer: customer._id,
        discount,
        totalAmount: customerTotal - discount,
        items: lineItems,
      });

      grandTotal += customerTotal - discount;
    }

    const saleDoc = new SalesEntry({
      transactionNumber,
      dateOfSale: sales[0].dateOfSale
        ? new Date(sales[0].dateOfSale)
        : new Date(),
      totalAmount: grandTotal,
      status: "completed",
      purchase,
      customers: customersArray,
    });

    await saleDoc.save();

    return res
      .status(201)
      .json({ message: "Sales transaction saved", sale: saleDoc });
  } catch (err) {
    console.error("Sale creation error:", err);
    return res.status(err.status || 500).json({
      message: err.message || "Internal server error",
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
        },
      },
      // 5) Lookup Supplier details
      {
        $lookup: {
          from: "suppliers",
          localField: "customers.items.supplier",
          foreignField: "_id",
          as: "supplierInfo",
        },
      },

      // 6) Project to the shape we want
      {
        $project: {
          _id: 0,
          transactionNumber: 1,
          dateOfSale: 1,
          customer: "$customers.customer",
          discount: "$customers.discount",
          // Item fields
          item: {
            _id: { $arrayElemAt: ["$itemInfo._id", 0] },
            itemName: { $arrayElemAt: ["$itemInfo.itemName", 0] },
          },
          // Supplier fields
          supplier: {
            _id: { $arrayElemAt: ["$supplierInfo._id", 0] },
            supplierName: { $arrayElemAt: ["$supplierInfo.supplierName", 0] },
          },
          // Sale quantity and pricing
          quantity: "$customers.items.quantity",
          unitPrice: "$customers.items.unitPrice",
          totalCost: "$customers.items.totalCost",
        },
      },

      // 7) Facet for pagination + total count
      {
        $facet: {
          paginatedResults: [{ $skip: skip }, { $limit: parseInt(limit) }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const agg = await SalesEntry.aggregate(pipeline);
    const rows = agg[0].paginatedResults;
    const total = agg[0].totalCount[0]?.count || 0;

    return res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalEntries: total,
      totalPages: Math.ceil(total / limit),
      entries: rows,
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

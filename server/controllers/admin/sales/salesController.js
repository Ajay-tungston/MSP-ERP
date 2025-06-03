const SalesEntry = require("../../../models/SalesEntry");
const Customer = require("../../../models/Customer");
const Supplier = require("../../../models/Supplier");
const Item = require("../../../models/Item");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const getNextCounterNumber = require("../../../utils/counter");

const mongoose = require("mongoose");
const Payment = require("../../../models/Payment");

const createSaleTransaction = async (req, res) => {
  const sessionData = {
    originalPurchaseItems: null,
    purchaseEntry: null,
  };

  try {
    const sales = Array.isArray(req.body) ? req.body : [req.body];
    if (sales.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one sale block is required" });
    }

    const customersArray = [];
    let grandTotal = 0;
    let purchaseDta;

    for (const saleData of sales) {
      const { customer: customerId, discount = 0, items, purchase } = saleData;
      const purchaseEntry = await PurchaseEntry.findById(purchase);
      if (!purchaseEntry) throw new Error("Purchase entry not found");

      // Save original purchase state for rollback
      if (!sessionData.originalPurchaseItems) {
        sessionData.originalPurchaseItems = JSON.parse(
          JSON.stringify(purchaseEntry.items)
        );
        sessionData.purchaseEntry = purchaseEntry;
      }

      purchaseDta = purchase;

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

        const purchaseItem = purchaseEntry.items.find(
          (i) => i.item.toString() === itemId && i.quantityType === quantityType
        );

        if (!purchaseItem) {
          throw new Error("Item not found in purchase entry");
        }

        // Check and apply sale quantity
        purchaseItem.soldQuantity += quantity;
        purchaseItem.remainingQuantity =
          purchaseItem.quantity - purchaseItem.soldQuantity;

        if (purchaseItem.remainingQuantity < 0) {
          throw new Error("Sold quantity exceeds available quantity");
        }

        purchaseItem.isCompleted = purchaseItem.remainingQuantity === 0;
        await purchaseEntry.save();

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

    const transactionNumber = await getNextCounterNumber("saleTransaction");

    const saleDoc = new SalesEntry({
      transactionNumber,
      dateOfSale: sales[0].dateOfSale
        ? new Date(sales[0].dateOfSale)
        : new Date(),
      totalAmount: grandTotal,
      status: "completed",
      purchase: purchaseDta,
      customers: customersArray,
    });

    await saleDoc.save();

    return res
      .status(201)
      .json({ message: "Sales transaction saved", sale: saleDoc });
  } catch (err) {
    console.error("Sale creation error:", err);

    // Manual rollback if purchaseEntry was modified
    if (sessionData.originalPurchaseItems && sessionData.purchaseEntry) {
      sessionData.purchaseEntry.items = sessionData.originalPurchaseItems;
      try {
        await sessionData.purchaseEntry.save();
      } catch (rollbackErr) {
        console.error("Rollback failed:", rollbackErr);
      }
    }

    return res.status(500).json({
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
    const { customerId, page = 1, limit = 10, startDate, endDate } = req.query;

    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    const skip = (page - 1) * limit;
    const custObjId = new mongoose.Types.ObjectId(customerId);

    // Build date filter if provided
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const matchStage = {
      "customers.customer": custObjId,
    };

    if (startDate || endDate) {
      matchStage.dateOfSale = {};
      if (startDate) matchStage.dateOfSale.$gte = new Date(startDate);
      if (endDate) matchStage.dateOfSale.$lte = new Date(endDate);
    }

    const pipeline = [
      // 1) Match sales containing the customer and (optional) date range
      { $match: matchStage },

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

          item: {
            _id: { $arrayElemAt: ["$itemInfo._id", 0] },
            itemName: { $arrayElemAt: ["$itemInfo.itemName", 0] },
          },

          supplier: {
            _id: { $arrayElemAt: ["$supplierInfo._id", 0] },
            supplierName: { $arrayElemAt: ["$supplierInfo.supplierName", 0] },
          },

          quantityKg: {
            $cond: [
              { $eq: ["$customers.items.quantityType", "kg"] },
              "$customers.items.quantity",
              0,
            ],
          },
          quantityBox: {
            $cond: [
              { $eq: ["$customers.items.quantityType", "box"] },
              "$customers.items.quantity",
              0,
            ],
          },

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

const getCustomerSalesByDate = async (req, res) => {
  try {
    const { customerId, date } = req.query;

    if (!customerId || !date) {
      return res
        .status(400)
        .json({ message: "Customer ID and date are required" });
    }

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find all transactions on the given date
    const transactions = await SalesEntry.find({
      dateOfSale: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("customers.customer")
      .populate("customers.items.item")
      .populate("customers.items.supplier");

    let report = [];
    let entryNo = 1;
    let dailyTotal = 0;

    transactions.forEach((transaction) => {
      transaction.customers.forEach((customerEntry) => {
        if (customerEntry.customer._id.toString() === customerId) {
          dailyTotal += customerEntry.totalAmount;

          customerEntry.items.forEach((item) => {
            report.push({
              No: entryNo++,
              Date: transaction.dateOfSale.toISOString().split("T")[0],
              Item: item.item.itemName || "N/A",
              Supplier: item.supplier.supplierName || "N/A",
              "Qty (KG)": item.quantityType === "kg" ? item.quantity : "-",
              "Qty (Box)": item.quantityType === "box" ? item.quantity : "-",
              Price: item.unitPrice,
              Total: item.totalCost,
              supplierCode: item.supplier.supplierCode,
            });
          });
        }
      });
    });

    // 2️⃣ STEP 2: Calculate previous total sales (BEFORE selected date)
    const salesBeforeDate = await SalesEntry.find({
      dateOfSale: { $lt: startOfDay },
      "customers.customer": customerId,
    });

    let totalSalesBefore = 0;
    salesBeforeDate.forEach((sale) => {
      sale.customers.forEach((cust) => {
        if (cust.customer.toString() === customerId) {
          totalSalesBefore += cust.totalAmount;
        }
      });
    });

    // 3️⃣ STEP 3: Calculate total payments before the selected date
    const paymentsBeforeDate = await Payment.find({
      customer: customerId,
      paymentType: "PaymentIn",
      date: { $lt: startOfDay },
    });

    let totalPaymentsBefore = 0;
    paymentsBeforeDate.forEach((pay) => {
      totalPaymentsBefore += pay.amount;
    });

    // 4️⃣ STEP 4: Correct previous balance
    const previousBalance = totalSalesBefore - totalPaymentsBefore;

    // 5️⃣ STEP 5: Get today's payment (for display)
    const paymentsToday = await Payment.find({
      customer: customerId,
      paymentType: "PaymentIn",
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    let dailyReceipts = 0;
    paymentsToday.forEach((pay) => {
      dailyReceipts += pay.amount;
    });

    res.json({
      report,
      dailyTotal,
      previousBalance,
      dailyReceipts,
      grossTotal: previousBalance + dailyTotal - dailyReceipts,
    });
  } catch (error) {
    console.error("Error fetching sales report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//for sales report
const getSalesEntriesByDate = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      page = 1,
      limit = 10,
      paginate = "true",
    } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include full day

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const shouldPaginate = paginate === "true";

    const basePipeline = [
      { $match: { dateOfSale: { $gte: start, $lte: end } } },
      { $unwind: "$customers" },
      { $unwind: "$customers.items" },
      {
        $lookup: {
          from: "customers",
          localField: "customers.customer",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      { $unwind: "$customerInfo" },
      {
        $group: {
          _id: "$customers.customer",
          customerName: { $first: "$customerInfo.customerName" },
          totalKg: {
            $sum: {
              $cond: [
                { $eq: ["$customers.items.quantityType", "kg"] },
                "$customers.items.quantity",
                0,
              ],
            },
          },
          totalBox: {
            $sum: {
              $cond: [
                { $eq: ["$customers.items.quantityType", "box"] },
                "$customers.items.quantity",
                0,
              ],
            },
          },
          totalAmount: { $sum: "$customers.items.totalCost" },
        },
      },
      { $sort: { customerName: 1 } },
    ];

    if (shouldPaginate) {
      const paginatedPipeline = [
        ...basePipeline,
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [{ $skip: skip }, { $limit: parseInt(limit) }],
          },
        },
      ];

      const result = await SalesEntry.aggregate(paginatedPipeline);
      const total = result[0]?.metadata[0]?.total || 0;
      const data = result[0]?.data || [];

      return res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        data,
      });
    } else {
      const data = await SalesEntry.aggregate(basePipeline);

      const grandTotalKg = data.reduce(
        (sum, entry) => sum + (entry.totalKg || 0),
        0
      );
      const grandTotalBox = data.reduce(
        (sum, entry) => sum + (entry.totalBox || 0),
        0
      );
      const grandTotalAmount = data.reduce(
        (sum, entry) => sum + (entry.totalAmount || 0),
        0
      );

      return res.json({
        total: data.length,
        grandTotalKg,
        grandTotalBox,
        grandTotalAmount,
        data,
      });
    }
  } catch (error) {
    console.error("Error in customer sales summary:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//need to check

// const createSaleTransaction = async (req, res) => {
//   const session = await mongoose.startSession();
//   try {
//     await session.withTransaction(async () => {
//       const sales = Array.isArray(req.body) ? req.body : [req.body];
//       if (sales.length === 0) {
//         throw new Error("At least one sale block is required");
//       }

//       const transactionNumber = await getNextCounterNumber("saleTransaction");
//       const customersArray = [];
//       let grandTotal = 0;
//       let purchaseDta;

//       for (const saleData of sales) {
//         const { customer: customerId, discount = 0, items, purchase } = saleData;

//         const purchaseEntry = await PurchaseEntry.findById(purchase).session(session);
//         if (!purchaseEntry) throw new Error("Purchase entry not found");
//         purchaseDta = purchase;

//         const customer = await Customer.findById(customerId).session(session);
//         if (!customer) throw new Error(`Customer ${customerId} not found`);

//         let customerTotal = 0;
//         const lineItems = [];

//         for (const itm of items) {
//           const { item: itemId, supplier: supplierId, quantityType, quantity, unitPrice } = itm;

//           const item = await Item.findById(itemId).session(session);
//           const supplier = await Supplier.findById(supplierId).session(session);
//           const purchaseItem = purchaseEntry.items.find(
//             (i) => i.item.toString() === itemId && i.quantityType === quantityType
//           );

//           if (!purchaseItem) throw new Error("Item not found in purchase entry");

//           const projectedSold = purchaseItem.soldQuantity + quantity;
//           const projectedRemaining = purchaseItem.quantity - projectedSold;
//           if (projectedRemaining < 0) {
//             throw new Error("Sold quantity exceeds available quantity");
//           }

//           purchaseItem.soldQuantity = projectedSold;
//           purchaseItem.remainingQuantity = projectedRemaining;
//           purchaseItem.isCompleted = projectedRemaining === 0;

//           const totalCost = quantity * unitPrice;
//           customerTotal += totalCost;

//           lineItems.push({
//             item: item._id,
//             supplier: supplier._id,
//             quantityType,
//             quantity,
//             unitPrice,
//             totalCost,
//           });
//         }

//         await purchaseEntry.save({ session });

//         customersArray.push({
//           customer: customer._id,
//           discount,
//           totalAmount: customerTotal - discount,
//           items: lineItems,
//         });

//         grandTotal += customerTotal - discount;
//       }

//       const saleDoc = new SalesEntry({
//         transactionNumber,
//         dateOfSale: sales[0].dateOfSale ? new Date(sales[0].dateOfSale) : new Date(),
//         totalAmount: grandTotal,
//         status: "completed",
//         purchase: purchaseDta,
//         customers: customersArray,
//       });

//       await saleDoc.save({ session });
//     });

//     res.status(201).json({ message: "Sales transaction saved successfully" });
//   } catch (err) {
//     console.error("Sale transaction error:", err);
//     res.status(500).json({ message: err.message || "Internal server error" });
//   } finally {
//     session.endSession();
//   }
// };


const getAllCustomerSalesByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch sales entries on the selected date
    const transactions = await SalesEntry.find({
      dateOfSale: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("customers.customer")
      .populate("customers.items.item")
      .populate("customers.items.supplier");

    const customerSalesMap = new Map();

    // Step 1: Group sales by customer
    transactions.forEach((transaction) => {
      transaction.customers.forEach((customerEntry) => {
        const custId = customerEntry.customer._id.toString();

        if (!customerSalesMap.has(custId)) {
          customerSalesMap.set(custId, {
            customerId: custId,
            customerName: customerEntry.customer.customerName,
            items: [],
            dailyTotal: 0,
          });
        }

        const customerData = customerSalesMap.get(custId);
        customerData.dailyTotal += customerEntry.totalAmount;

        customerEntry.items.forEach((item) => {
          customerData.items.push({
            Date: transaction.dateOfSale.toISOString().split("T")[0],
            Item: item.item.itemName || "N/A",
            Supplier: item.supplier.supplierName || "N/A",
            "Qty (KG)": item.quantityType === "kg" ? item.quantity : "-",
            "Qty (Box)": item.quantityType === "box" ? item.quantity : "-",
            Price: item.unitPrice,
            Total: item.totalCost,
            supplierCode: item.supplier.supplierCode,
          });
        });
      });
    });

    const allCustomersSales = Array.from(customerSalesMap.values());

    // Step 2: Calculate previous balance & daily receipts per customer
    for (const cust of allCustomersSales) {
      const customerId = cust.customerId;

      // Total sales before date
      const salesBeforeDate = await SalesEntry.find({
        dateOfSale: { $lt: startOfDay },
        "customers.customer": customerId,
      });

      let totalSalesBefore = 0;
      salesBeforeDate.forEach((sale) => {
        sale.customers.forEach((c) => {
          if (c.customer.toString() === customerId) {
            totalSalesBefore += c.totalAmount;
          }
        });
      });

      // Total payments before date
      const paymentsBeforeDate = await Payment.find({
        customer: customerId,
        paymentType: "PaymentIn",
        date: { $lt: startOfDay },
      });

      let totalPaymentsBefore = 0;
      paymentsBeforeDate.forEach((p) => {
        totalPaymentsBefore += p.amount;
      });

      // Previous balance
      const previousBalance = totalSalesBefore - totalPaymentsBefore;

      // Daily receipts
      const paymentsToday = await Payment.find({
        customer: customerId,
        paymentType: "PaymentIn",
        date: { $gte: startOfDay, $lte: endOfDay },
      });

      let dailyReceipts = 0;
      paymentsToday.forEach((p) => {
        dailyReceipts += p.amount;
      });

      // Final calculations
      cust.previousBalance = previousBalance;
      cust.dailyReceipts = dailyReceipts;
      cust.grossTotal = previousBalance + cust.dailyTotal - dailyReceipts;
    }

    res.json({
      date,
      customers: allCustomersSales,
      totalCustomers: allCustomersSales.length,
    });
  } catch (error) {
    console.error("Error fetching all customer sales report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSaleTransaction,
  getSalesEntries,
  getCustomerSalesReport,
  getCustomerSalesByDate,
  getSalesEntriesByDate,
  getAllCustomerSalesByDate
};

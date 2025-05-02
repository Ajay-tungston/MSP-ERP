const  mongoose  = require("mongoose");
const Counter = require("../../../models/Counter");
const Item = require("../../../models/Item");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const Supplier = require("../../../models/Supplier");
const getNextCounterNumber = require("../../../utils/counter");
const validator = require("validator");

const createPurchaseEntry = async (req, res) => {
  //added validation in schema
  try {
    console.log(req.body);
    const { supplierId, items, dateOfPurchase, marketFee } = req.body;
    if (!supplierId || !items || !dateOfPurchase || !marketFee) {
      return res.status(400).json({ error: "all feilds are required" });
    }

    const supplier = await Supplier.findById(supplierId);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    if (!validator.isISO8601(dateOfPurchase)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Optional: Check if the date is not in the future
    const inputDate = new Date(dateOfPurchase);
    const now = new Date();

    if (inputDate > now) {
      return res
        .status(400)
        .json({ error: "Date of purchase cannot be in the future" });
    }
    if (typeof marketFee !== "number" || marketFee < 0) {
      return res
        .status(400)
        .json({ error: "Market fee must be a non-negative number" });
    }

    const newPurchaseNumber = await getNextCounterNumber("purchaseNumber");

    let grossTotalAmount = 0;
    let totalKg = 0;
    let totalBox = 0;
    const purchaseItems = [];

    for (let itemDetails of items) {
      const { itemName, quantity, unitType, unitPrice } = itemDetails;

      const item = await Item.findOne({ itemName });
      if (!item) {
        return res.status(404).json({ message: `Item ${itemName} not found` });
      }

      // const convertedQuantity =
      //   unitType === "box" ? quantity * item.conversionRatio : quantity;

      const totalCost = quantity * unitPrice;

      purchaseItems.push({
        item: item._id,
        quantity: quantity,
        quantityType: unitType,
        remainingQuantity: quantity,
        unitPrice,
        totalCost,
      });
      grossTotalAmount += totalCost;
      unitType === "kg" ? (totalKg += quantity) : (totalBox += quantity);
    }

    const commissionPaid = (grossTotalAmount * supplier.commission) / 100;
    const netTotalAmount = grossTotalAmount - (commissionPaid +marketFee);

    const purchaseEntry = new PurchaseEntry({
      purchaseNumber: newPurchaseNumber,
      supplier: supplier._id,
      items: purchaseItems,
      grossTotalAmount,
      netTotalAmount,
      totalBox,
      totalKg,
      commissionPaid,
      dateOfPurchase,
      marketFee,
    });

    await purchaseEntry.save();

    res.status(201).json({ message: "Purchase Entry Created", purchaseEntry });
  } catch (error) {
    console.error(error);

    // Extract validation error messages from schema
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePurchaseEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplierId, items, dateOfPurchase, marketFee } = req.body;

    if (!supplierId || !items || !dateOfPurchase || marketFee == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    if (!validator.isISO8601(dateOfPurchase)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const inputDate = new Date(dateOfPurchase);
    const now = new Date();
    if (inputDate > now) {
      return res
        .status(400)
        .json({ error: "Date of purchase cannot be in the future" });
    }

    if (typeof marketFee !== "number" || marketFee < 0) {
      return res
        .status(400)
        .json({ error: "Market fee must be a non-negative number" });
    }

    const purchaseEntry = await PurchaseEntry.findById(id);
    if (!purchaseEntry) {
      return res.status(404).json({ message: "Purchase Entry not found" });
    }

    let grossTotalAmount = 0;
    let totalKg = 0;
    let totalBox = 0;
    const purchaseItems = [];

    for (let itemDetails of items) {
      const { itemName, quantity, unitType, unitPrice } = itemDetails;

      const item = await Item.findOne({ itemName });
      if (!item) {
        return res.status(404).json({ message: `Item ${itemName} not found` });
      }

      const totalCost = quantity * unitPrice;

      purchaseItems.push({
        item: item._id,
        quantity: quantity,
        quantityType: unitType,
        remainingQuantity: quantity,
        unitPrice,
        totalCost,
      });
      grossTotalAmount += totalCost;
      unitType === "kg" ? (totalKg += quantity) : (totalBox += quantity);
    }

    const commissionPaid = (grossTotalAmount * supplier.commission) / 100;
    const netTotalAmount = grossTotalAmount - (commissionPaid + marketFee);

    // Update fields
    purchaseEntry.supplier = supplier._id;
    purchaseEntry.items = purchaseItems;
    purchaseEntry.grossTotalAmount = grossTotalAmount;
    purchaseEntry.netTotalAmount = netTotalAmount;
    purchaseEntry.totalBox = totalBox;
    purchaseEntry.totalKg = totalKg;
    purchaseEntry.commissionPaid = commissionPaid;
    purchaseEntry.dateOfPurchase = dateOfPurchase;
    purchaseEntry.marketFee = marketFee;

    await purchaseEntry.save();

    res.status(200).json({ message: "Purchase Entry Updated", purchaseEntry });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAllPurchaseEntries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      noPagination,
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    let filter = {};

    if (startDate && endDate) {
      filter.dateOfPurchase = {
        $gte: new Date(startDate),
        $lte: endDate
          ? new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
          : new Date(),
      };
    }

    let query = PurchaseEntry.find(filter)
      .populate("supplier items.item")
      .sort({ dateOfPurchase: -1 });

    if (!noPagination) {
      // Only apply skip and limit if noPagination is false
      query = query.skip((pageNumber - 1) * limitNumber).limit(limitNumber);
    }

    const purchaseEntries = await query;

    const totalEntries = await PurchaseEntry.countDocuments(filter);

    res.status(200).json({
      totalPages: noPagination ? 1 : Math.ceil(totalEntries / limitNumber),
      currentPage: noPagination ? 1 : pageNumber,
      totalEntries,
      purchaseEntries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//for calclute the total amount for the getAllPurchaseEntries search
const getTotalPurchaseStats = async (req, res) => {
  try {
    const { startDate, endDate ,supplierId} = req.query;
    let filter = {};

    if (startDate && endDate) {
      filter.dateOfPurchase = {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)),
      };
    }

    if (supplierId) {
      filter.supplier = new mongoose.Types.ObjectId(supplierId);
    }

    const result = await PurchaseEntry.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          netTotalAmount: { $sum: "$netTotalAmount" },
          grossTotalAmount: { $sum: "$grossTotalAmount" },
          totalCommission: { $sum: "$commissionPaid" },
          totalBox: { $sum: "$totalBox" },
          totalKg: { $sum: "$totalKg" },
          totalMarketFee: { $sum: "$marketFee" },
        },
      },
    ]);
    const stats = result[0] || {
      netTotalAmount: 0,
      totalCommission: 0,
      totalBox: 0,
      totalKg: 0,
      totalMarketFee: 0,
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching purchase stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPurchaseCounter = async (req, res) => {
  try {
    const purchaseNo = await Counter.find({ name: "purchaseNumber" });
    res.status(200).json({ count: purchaseNo ? purchaseNo[0].value : 0 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getSupplierPurchaseReport = async (req, res) => {
  try {
    const { supplierId, startDate=new Date().toLocaleDateString("en-CA")
    , endDate=new Date().toLocaleDateString("en-CA")
  ,  page = 1, limit = 10  } = req.query;
console.log(req.query)
    if (!supplierId || !startDate || !endDate) {
      return res.status(400).json({ error: "supplierId, startDate, and endDate are required" });
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    const filter = {
      supplier: supplierId,
      dateOfPurchase: {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)),
      },
    };


    const skip = (page - 1) * limit;

    // Fetch the purchase entries with pagination
    const entries = await PurchaseEntry.find(filter)
      // .populate("items.item")
      .sort({ dateOfPurchase: -1 })
      .skip(skip)
      .limit(limit);
  

    // const stats = await PurchaseEntry.aggregate([
    //   { $match: filter },
    //   {
    //     $group: {
    //       _id: null,
    //       grossTotalAmount: { $sum: "$grossTotalAmount" },
    //       netTotalAmount: { $sum: "$netTotalAmount" },
    //       commissionPaid: { $sum: "$commissionPaid" },
    //       totalBox: { $sum: "$totalBox" },
    //       totalKg: { $sum: "$totalKg" },
    //       totalMarketFee: { $sum: "$marketFee" },
    //     },
    //   },
    // ]);

    // const summary = stats[0] || {
    //   grossTotalAmount: 0,
    //   netTotalAmount: 0,
    //   commissionPaid: 0,
    //   totalBox: 0,
    //   totalKg: 0,
    //   totalMarketFee: 0,
    // };
      // Calculate total pages
      const totalEntries = await PurchaseEntry.countDocuments(filter);
      const totalPages = Math.ceil(totalEntries / limit);

    res.status(200).json({
      supplier: {
        id: supplier._id,
        name: supplier.name,
      },
      startDate,
      endDate,
      page,
      totalPages,
      totalEntries,
      // summary,
      purchaseEntries: entries,
    });
  } catch (error) {
    console.error("Error in supplier report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
const getIncompletePurchases = async (req, res) => {
  try {
    // Fetch purchases where at least one item is not completed
    const incompletePurchases = await PurchaseEntry.find({
      "items.isCompleted": false,
    }).populate("supplier").populate("items.item");

    res.status(200).json(incompletePurchases);
  } catch (error) {
    console.error("Error fetching incomplete purchases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid purchase ID" });
    }

    // Find the purchase entry and populate supplier and items
    const purchase = await PurchaseEntry.findById(id)
      .populate("supplier")
      .populate("items.item");

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.status(200).json(purchase);
  } catch (error) {
    console.error("Error fetching purchase:", error);
    res.status(500).json({ message: "Server error while fetching purchase" });
  }
};

module.exports = {
  createPurchaseEntry,
  getAllPurchaseEntries,
  getPurchaseCounter,
  getIncompletePurchases,
  getPurchaseById,
  getTotalPurchaseStats,
  getSupplierPurchaseReport,
  updatePurchaseEntry
};

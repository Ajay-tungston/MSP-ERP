const { default: mongoose } = require("mongoose");
const Counter = require("../../../models/Counter");
const Item = require("../../../models/Item");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const Supplier = require("../../../models/Supplier");
const getNextCounterNumber = require("../../../utils/counter");
const validator=require("validator")

const createPurchaseEntry = async (req, res) => {
  //added validation in schema
  try {
    const { supplierId, items, dateOfPurchase } = req.body;
    console.log(req.body)
    if (!supplierId || !items || !dateOfPurchase) {
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

    const newPurchaseNumber = await getNextCounterNumber("purchaseNumber");

    let totalAmount = 0;
    let totalKg = 0;
    let totalBox=0
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
        quantityType:unitType,
        remainingQuantity: quantity,
        unitPrice,
        totalCost,
      });
      totalAmount += totalCost;
      unitType==="kg"?
      totalKg += quantity:totalBox+=quantity
    }

    const commissionPaid = (totalAmount * supplier.commission) / 100;

    const purchaseEntry = new PurchaseEntry({
      purchaseNumber: newPurchaseNumber,
      supplier: supplier._id,
      items: purchaseItems,
      totalAmount,
      totalBox,
      totalKg,
      commissionPaid,
      dateOfPurchase,
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

const getAllPurchaseEntries = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;

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
    const purchaseEntries = await PurchaseEntry.find(filter)
      .populate("supplier items.item")
      .sort({ dateOfPurchase: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalEntries = await PurchaseEntry.countDocuments(filter);

    res.status(200).json({
      totalPages: Math.ceil(totalEntries / limitNumber),
      currentPage: pageNumber,
      totalEntries,
      purchaseEntries,
    });
  } catch (error) {
    console.error(error);
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
};

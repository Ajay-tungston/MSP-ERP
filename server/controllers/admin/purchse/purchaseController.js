const Counter = require("../../../models/Counter");
const Item = require("../../../models/Item");
const PurchaseEntry = require("../../../models/PurchaseEntry");
const Supplier = require("../../../models/Supplier");
const getNextCounterNumber = require("../../../utils/counter");

const createPurchaseEntry = async (req, res) => {
  //added validation in schema
  try {
    const { supplierId, items } = req.body;

    const supplier = await Supplier.findById(supplierId);
    
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const newPurchaseNumber = await getNextCounterNumber("purchaseNumber");

    let totalAmount = 0;
    let totalQuantity = 0;
    const purchaseItems = [];

    for (let itemDetails of items) {
      const { itemName, quantity, unitType, unitPrice } = itemDetails;

      const item = await Item.findOne({ itemName });
      if (!item) {
        return res.status(404).json({ message: `Item ${itemName} not found` });
      }

      const convertedQuantity =
        unitType === "box" ? quantity * item.conversionRatio : quantity;

      const totalCost = convertedQuantity * unitPrice;

      purchaseItems.push({
        item: item._id,
        quantity: convertedQuantity,
        remainingQuantity: convertedQuantity,
        unitPrice,
        totalCost,
      });

      totalAmount += totalCost;
      totalQuantity += convertedQuantity;
    }

    const commissionPaid = (totalAmount * supplier.commission) / 100;

    const purchaseEntry = new PurchaseEntry({
      purchaseNumber: newPurchaseNumber,
      supplier: supplier._id,
      items: purchaseItems,
      totalAmount,
      totalQuantity,
      commissionPaid,
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
        : new Date()      };
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

const getPurchaseCounter=async(req,res)=>{
  try {
    const purchaseNo=await Counter.find({name:"purchaseNumber"})
    res.status(200).json({ count: purchaseNo ? purchaseNo[0].value : 0 });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createPurchaseEntry, getAllPurchaseEntries,getPurchaseCounter };

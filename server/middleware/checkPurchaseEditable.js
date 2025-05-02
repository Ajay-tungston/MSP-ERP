const SalesEntry = require("../models/SalesEntry");

const checkPurchaseEditable = async (req, res, next) => {
  const purchaseId = req.params.id;

  try {
    const usedInSale = await SalesEntry.exists({ 'purchase': purchaseId });

    if (usedInSale) {
      return res.status(400).json({
        error: 'This purchase entry has already been used in a sale and cannot be edited.',
      });
    }

    next(); // safe to proceed
  } catch (error) {
    console.error("Middleware check error:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = checkPurchaseEditable;

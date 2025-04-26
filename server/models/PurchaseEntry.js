const mongoose = require("mongoose");

const purchaseItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  quantityType: {
    type: String,
    enum: ["kg", "box"],
    required: true,
  },
  soldQuantity: {
    type: Number,
    default: 0, // Tracks how much has been sold
    min: [0, "Sold quantity cannot be negative"],
  },
  remainingQuantity: {
    type: Number, // Automatically calculated
    min: [0, "Remaining quantity cannot be negative"],
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, "Unit price must be at least 0"],
  },
  totalCost: {
    type: Number,
    required: true,
    min: [0, "Total cost must be at least 0"],
  },
});


const purchaseEntrySchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    purchaseNumber: {
      type: Number,
      unique: true, 
      required: true,
    },
    items: {
      type: [purchaseItemSchema],
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "At least one item must be included in the purchase",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalKg: {
      type: Number,
      required: true,
      default: 0,
    },
    totalBox: {
      type: Number,
      required: true,
      default: 0,
    },
    commissionPaid: {
      type: Number,
      required: true,
      min: [0, "Commission cannot be negative"],
    },
    dateOfPurchase: {
      type: Date,
      default: Date.now,
    },
    marketFee:{
      type: Number,
      required: true,
      min: [0, "marketFee cannot be negative"],
    }
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("PurchaseEntry", purchaseEntrySchema);

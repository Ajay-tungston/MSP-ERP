const mongoose = require("mongoose");

// Schema for each item sold in a transaction
const saleItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true, // To track original source
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be at least 1"],
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
  }
});

// Sale transaction to customers
const saleTransactionSchema = new mongoose.Schema({
  transactionNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  dateOfSale: {
    type: Date,
    default: Date.now,
  },
  items: {
    type: [saleItemSchema],
    validate: {
      validator: function (items) {
        return items.length > 0;
      },
      message: "At least one item must be sold",
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "returned"],
    default: "completed",
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("SalesEntry", saleTransactionSchema);

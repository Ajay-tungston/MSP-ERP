const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
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

// NEW: customer-level structure inside the transaction
const saleCustomerSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
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
});

const saleTransactionSchema = new mongoose.Schema({
  transactionNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  customers: {
    type: [saleCustomerSchema],
    validate: {
      validator: function (customers) {
        return customers.length > 0;
      },
      message: "At least one customer must be included",
    },
  },
  dateOfSale: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "returned"],
    default: "completed",
  },
}, { timestamps: true });

module.exports = mongoose.model("SalesEntry", saleTransactionSchema);

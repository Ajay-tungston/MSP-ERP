const mongoose = require("mongoose");

// Item-level schema
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
  quantityType: {
    type: String,
    enum: ["kg", "box"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity must be greater than 0"]
  },
  unitPrice: {
    type: Number,
    required: true,
    min: [0, "Unit price must be at least 0"],
  },
  totalCost: {
    type: Number,
    required: true,
    min: [0, "Total cost must be at least 0"]
  }
});

// Customer-level schema
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

// Transaction-level schema
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
  status: {
    type: String,
    enum: ["pending", "completed", "returned"],
    default: "completed",
  },
  purchase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
    required: true,
  },
}, { timestamps: true });

const SalesEntry = mongoose.models.SalesEntry || mongoose.model("SalesEntry", saleTransactionSchema);

module.exports = SalesEntry;
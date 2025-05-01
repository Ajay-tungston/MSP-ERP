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
  quantityKg: {
    type: Number,
    default: 0,
    min: [0, "Kg quantity cannot be negative"],
  },
  quantityBox: {
    type: Number,
    default: 0,
    min: [0, "Box quantity cannot be negative"],
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
    // Calculate total cost using quantity and unit price
    default: function() {
      const totalQuantity = this.quantityKg + this.quantityBox; 
      return totalQuantity * this.unitPrice;  // Adjust this as per your calculation logic
    }
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
  // Inside saleCustomerSchema
  totalQuantityKg: {
    type: Number,
    required: true,
    default: 0
  },
  totalQuantityBox: {
    type: Number,
    required: true,
    default: 0
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
  totalQuantityKg: {
    type: Number,
    required: true,
    default: 0
  },
  totalQuantityBox: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ["pending", "completed", "returned"],
    default: "completed",
  },
}, { timestamps: true });

// Avoiding "OverwriteModelError"
const SalesEntry = mongoose.models.SalesEntry || mongoose.model("SalesEntry", saleTransactionSchema);

module.exports = SalesEntry;

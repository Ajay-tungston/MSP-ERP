const mongoose = require("mongoose");
const getNextCounterNumber = require("../utils/counter");

const customerSchema = new mongoose.Schema({
  customerNumber: {
    type: Number,
    unique: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  whatsapp: {
    type: String,
  },
  discount: {
    type: Number, // Discount in percentage (e.g., 10 for 10%)
    min: 0,
    max: 100,
    default: 0
  },
  discountApplied: {
    type: String,
    enum: ["weekly", "monthly", "yearly", "manual"],
    default: "manual",
  },
  openingBalance: {
    type: Number,
    default: 0,
  },  
  previousBalance: {
    type: Number,
    default: 0,
  },
  routeCustomer: {
    type: Boolean, // If the customer belongs to a route
    default: false,
  },
  routeAddress: {
    type: String, // Address of the route (only if `routeCustomer` is true)
    required: function () {
      return this.routeCustomer;
    },
  },
}, { timestamps: true });

// Before saving, generate a unique customerNumber
customerSchema.pre("save", async function (next) {
  if (!this.customerNumber) {
    this.customerNumber = await getNextCounterNumber("customer");
  }
  next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

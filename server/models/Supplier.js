const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplierCode: { 
      type: String, 
      required: true, 
      unique: true 
    },

    supplierName: { 
      type: String, 
      required: true 
    }, 

    address: { 
      type: String
    }, 

    phone: { 
      type: String, 
      required: true 
    }, 

    whatsapp: { 
      type: String
    }, 

    advance: { 
      type: Number, 
      default: 0 
    }, 

    advanceDeducted: { 
      type: Number, 
      default: 0 
    }, 

    commission: { 
      type: Number,
      default: 10
    }, 
  },
  { timestamps: true } 
);


module.exports = mongoose.model("Supplier", supplierSchema);


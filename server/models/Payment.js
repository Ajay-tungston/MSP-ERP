const mongoose =require( "mongoose")

const paymentSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ['PaymentIn', 'PaymentOut'],
    required: true,
  },
  category: {
    type: String,
    enum: ['supplier', 'customer', 'Bank', 'employee','company', 'Other'],
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    default: null,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: null,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    default: null,
  },
  otherPartyName: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'Bank', 'UPI', 'Cheque', 'Other'],
    default: 'Cash',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    trim: true,
  }
}, { timestamps: true });

module.exports= mongoose.model('Payment', paymentSchema);

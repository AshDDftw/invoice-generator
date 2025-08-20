const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  rate: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true
  }
});

const invoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [productSchema],
  subtotal: {
    type: Number,
    required: true
  },
  gst: {
    type: Number,
    required: true,
    default: 18
  },
  gstAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', invoiceSchema);
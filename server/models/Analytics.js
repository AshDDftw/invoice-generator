const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['invoice', 'document', 'user_activity', 'revenue']
  },
  data: {
    invoiceCount: Number,
    totalRevenue: Number,
    documentCount: Number,
    activeUsers: Number,
    monthlyGrowth: Number,
    topProducts: [String],
    recentActivity: [String]
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    default: 'monthly'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Analytics', analyticsSchema);
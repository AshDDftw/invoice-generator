const express = require('express');
const Analytics = require('../models/Analytics');
const Invoice = require('../models/Invoice');
const Document = require('../models/Document');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get counts
    const invoiceCount = await Invoice.countDocuments({ user: userId });
    const documentCount = await Document.countDocuments({ user: userId });
    
    // Calculate total revenue
    const invoices = await Invoice.find({ user: userId });
    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
    
    // Get recent activity
    const recentInvoices = await Invoice.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('totalAmount createdAt');
    
    // Monthly growth (mock calculation)
    const monthlyGrowth = Math.floor(Math.random() * 20) + 5;
    
    // Top products
    const topProducts = invoices
      .flatMap(invoice => invoice.products)
      .reduce((acc, product) => {
        acc[product.name] = (acc[product.name] || 0) + product.quantity;
        return acc;
      }, {});
    
    const sortedProducts = Object.entries(topProducts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name]) => name);

    const analytics = {
      invoiceCount,
      documentCount,
      totalRevenue,
      monthlyGrowth,
      topProducts: sortedProducts,
      recentActivity: recentInvoices.map(inv => 
        `Invoice ₹${inv.totalAmount} - ${inv.createdAt.toLocaleDateString()}`
      ),
      chartData: {
        revenue: Array.from({length: 12}, (_, i) => Math.floor(Math.random() * 10000) + 5000),
        invoices: Array.from({length: 12}, (_, i) => Math.floor(Math.random() * 50) + 10),
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// Get detailed reports
router.get('/reports/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const { period = 'monthly' } = req.query;
    
    let data = {};
    
    switch (type) {
      case 'revenue':
        const invoices = await Invoice.find({ user: req.user._id });
        data = {
          total: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
          breakdown: invoices.map(inv => ({
            date: inv.createdAt,
            amount: inv.totalAmount,
            products: inv.products.length
          }))
        };
        break;
        
      case 'products':
        const productInvoices = await Invoice.find({ user: req.user._id });
        const productStats = {};
        productInvoices.forEach(invoice => {
          invoice.products.forEach(product => {
            if (!productStats[product.name]) {
              productStats[product.name] = { quantity: 0, revenue: 0 };
            }
            productStats[product.name].quantity += product.quantity;
            productStats[product.name].revenue += product.total;
          });
        });
        data = productStats;
        break;
        
      default:
        data = { message: 'Report type not found' };
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

module.exports = router;
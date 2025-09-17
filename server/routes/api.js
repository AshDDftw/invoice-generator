const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// API Key management
router.get('/keys', auth, async (req, res) => {
  try {
    // Mock API keys for demo
    const apiKeys = [
      {
        id: '1',
        name: 'Production API',
        key: 'lv_prod_' + Math.random().toString(36).substr(2, 32),
        created: new Date(),
        lastUsed: new Date(),
        requests: Math.floor(Math.random() * 10000),
        status: 'active'
      },
      {
        id: '2',
        name: 'Development API',
        key: 'lv_dev_' + Math.random().toString(36).substr(2, 32),
        created: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        requests: Math.floor(Math.random() * 1000),
        status: 'active'
      }
    ];
    
    res.json(apiKeys);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching API keys', error: error.message });
  }
});

// Generate new API key
router.post('/keys', auth, async (req, res) => {
  try {
    const { name } = req.body;
    
    const newKey = {
      id: Date.now().toString(),
      name,
      key: 'lv_' + Math.random().toString(36).substr(2, 32),
      created: new Date(),
      lastUsed: null,
      requests: 0,
      status: 'active'
    };
    
    res.status(201).json(newKey);
  } catch (error) {
    res.status(500).json({ message: 'Error creating API key', error: error.message });
  }
});

// API Documentation endpoints
router.get('/docs', (req, res) => {
  const documentation = {
    version: '1.0.0',
    baseUrl: 'https://api.levitation.com/v1',
    authentication: 'Bearer token required',
    endpoints: [
      {
        method: 'POST',
        path: '/invoices',
        description: 'Create a new invoice',
        parameters: {
          products: 'Array of product objects',
          customer: 'Customer information object'
        },
        response: 'Invoice object with PDF URL'
      },
      {
        method: 'GET',
        path: '/invoices',
        description: 'List all invoices',
        parameters: {
          limit: 'Number of results (default: 10)',
          offset: 'Pagination offset (default: 0)'
        },
        response: 'Array of invoice objects'
      },
      {
        method: 'GET',
        path: '/analytics/dashboard',
        description: 'Get dashboard analytics',
        response: 'Analytics data object'
      },
      {
        method: 'POST',
        path: '/documents',
        description: 'Upload a document',
        parameters: {
          title: 'Document title',
          content: 'Base64 encoded file content',
          fileType: 'File type (pdf, doc, etc.)'
        },
        response: 'Document object'
      }
    ],
    examples: {
      createInvoice: {
        request: {
          products: [
            { name: 'Product 1', quantity: 2, rate: 100 }
          ],
          customer: {
            name: 'John Doe',
            email: 'john@example.com'
          }
        },
        response: {
          id: 'inv_123',
          totalAmount: 236,
          pdfUrl: 'https://api.levitation.com/invoices/inv_123.pdf'
        }
      }
    }
  };
  
  res.json(documentation);
});

// Webhook management
router.get('/webhooks', auth, async (req, res) => {
  try {
    const webhooks = [
      {
        id: '1',
        url: 'https://example.com/webhook',
        events: ['invoice.created', 'document.uploaded'],
        status: 'active',
        created: new Date()
      }
    ];
    
    res.json(webhooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching webhooks', error: error.message });
  }
});

// Create webhook
router.post('/webhooks', auth, async (req, res) => {
  try {
    const { url, events } = req.body;
    
    const webhook = {
      id: Date.now().toString(),
      url,
      events,
      status: 'active',
      created: new Date()
    };
    
    res.status(201).json(webhook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating webhook', error: error.message });
  }
});

module.exports = router;
const express = require('express');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const Invoice = require('../models/Invoice');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate PDF Invoice
router.post('/generate', auth, async (req, res) => {
  try {
    const { products } = req.body;
    
    // Calculate totals
    let subtotal = 0;
    const processedProducts = products.map(product => {
      const total = product.quantity * product.rate;
      subtotal += total;
      return { ...product, total };
    });

    const gstAmount = (subtotal * 18) / 100;
    const totalAmount = subtotal + gstAmount;

    // Save invoice to database
    const invoice = new Invoice({
      user: req.user._id,
      products: processedProducts,
      subtotal,
      gstAmount,
      totalAmount
    });
    await invoice.save();

    // Generate PDF
    const browser = await puppeteer.launch({
      args: process.env.NODE_ENV === 'production' 
        ? [...chromium.args, '--hide-scrollbars', '--disable-web-security']
        : [],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.NODE_ENV === 'production'
        ? await chromium.executablePath()
        : undefined,
      headless: process.env.NODE_ENV === 'production' ? chromium.headless : true,
    });
    const page = await browser.newPage();
    
    const htmlContent = generateInvoiceHTML(req.user, processedProducts, subtotal, gstAmount, totalAmount, invoice.invoiceDate);
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ 
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
      preferCSSPageSize: false
    });
    
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice._id}.pdf`);
    res.setHeader('Content-Length', pdf.length);
    res.end(pdf, 'binary');

  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ 
      message: 'Error generating PDF', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

function generateInvoiceHTML(user, products, subtotal, gstAmount, totalAmount, date) {
  const formattedDate = new Date(date).toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 20px; background: #fff; }
        .invoice-container { max-width: 595px; margin: 0 auto; background: white; }
        .header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #eaeaea; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-icon { width: 35px; height: 35px; background: #000; border-radius: 4px; position: relative; }
        .logo-icon::before { content: ''; position: absolute; width: 8px; height: 20px; background: #fff; left: 5px; top: 8px; }
        .logo-icon::after { content: ''; position: absolute; width: 8px; height: 20px; background: #fff; right: 5px; top: 8px; }
        .logo-text h1 { margin: 0; font-size: 17px; font-weight: 300; color: #000; }
        .logo-text p { margin: 0; font-size: 6px; color: #000; }
        .invoice-title { text-align: right; }
        .invoice-title h2 { margin: 0; font-size: 16px; font-weight: 600; color: #0a0a0a; }
        .invoice-title p { margin: 0; font-size: 10px; color: #333; opacity: 0.6; }
        .user-info { background: linear-gradient(116deg, #191919 0%, rgba(0,0,0,0) 100%), linear-gradient(55deg, #0f0f0f 0%, #303661 100%), #165fe3; border-radius: 10px; padding: 20px; margin: 20px 0; color: white; }
        .user-details { display: flex; justify-content: space-between; align-items: center; }
        .user-name h3 { margin: 0; font-size: 16px; color: #ccf575; }
        .user-email { background: white; color: #000; padding: 5px 10px; border-radius: 20px; font-size: 12px; }
        .date { font-size: 12px; color: #ddd; }
        .products-table { width: 100%; margin: 20px 0; }
        .table-header { background: linear-gradient(91deg, #303661 11%, #263406 114%); color: white; padding: 10px; border-radius: 78px; }
        .table-row { display: flex; justify-content: space-between; padding: 10px; font-size: 10px; }
        .product-row { background: #fafafa; margin: 2px 0; border-radius: 20px; padding: 10px; }
        .product-row:nth-child(even) { background: white; }
        .totals { background: white; border: 1px solid #a2a2a2; border-radius: 8px; padding: 12px; margin: 20px 0; width: 250px; margin-left: auto; }
        .total-row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 10px; }
        .total-row.final { font-weight: 700; font-size: 12px; color: #175ee2; }
        .footer { background: #272833; color: white; text-align: center; padding: 15px; border-radius: 40px; margin: 20px 0; font-size: 8px; }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="logo">
            <div class="logo-icon"></div>
            <div class="logo-text">
              <h1>Levitation</h1>
              <p>Infotech</p>
            </div>
          </div>
          <div class="invoice-title">
            <h2>INVOICE GENERATOR</h2>
            <p>Sample Output should be this</p>
          </div>
        </div>
        
        <div class="user-info">
          <div class="user-details">
            <div>
              <p style="font-size: 12px; color: rgba(204,204,204,0.8); margin: 0;">Name</p>
              <div class="user-name">
                <h3>${user.name}</h3>
              </div>
            </div>
            <div style="text-align: right;">
              <div class="date">Date: ${formattedDate}</div>
              <div class="user-email">${user.email}</div>
            </div>
          </div>
        </div>

        <div class="products-table">
          <div class="table-header">
            <div class="table-row">
              <span style="width: 25%;">Product</span>
              <span style="width: 25%;">Qty</span>
              <span style="width: 25%;">Rate</span>
              <span style="width: 25%;">Total Amount</span>
            </div>
          </div>
          ${products.map(product => `
            <div class="product-row">
              <div class="table-row">
                <span style="width: 25%;">${product.name}</span>
                <span style="width: 25%;">${product.quantity}</span>
                <span style="width: 25%;">₹${product.rate}</span>
                <span style="width: 25%;">₹${product.total}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="totals">
          <div class="total-row">
            <span>Total Charges</span>
            <span>₹${subtotal}</span>
          </div>
          <div class="total-row">
            <span>GST (18%)</span>
            <span>₹${gstAmount.toFixed(2)}</span>
          </div>
          <div class="total-row final">
            <span>Total Amount</span>
            <span>₹${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 8px; color: #515151;">
          Date: ${formattedDate}
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = router;
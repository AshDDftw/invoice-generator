const express = require('express');
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

const router = express.Router();

// Test PDF generation
router.get('/test', async (req, res) => {
  try {
    console.log('Starting PDF test...');
    
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

    console.log('Browser launched successfully');
    
    const page = await browser.newPage();
    await page.setContent('<h1>Test PDF</h1><p>This is a test PDF generation.</p>');
    
    const pdf = await page.pdf({ 
      format: 'A4',
      printBackground: true 
    });
    
    await browser.close();
    console.log('PDF generated successfully');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=test.pdf');
    res.send(pdf);

  } catch (error) {
    console.error('Test PDF Error:', error);
    res.status(500).json({ 
      message: 'Test PDF failed', 
      error: error.message 
    });
  }
});

module.exports = router;
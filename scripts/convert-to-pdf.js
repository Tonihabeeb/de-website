const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHtmlToPdf() {
  console.log('🔄 Starting PDF conversion...');
  
  const documentsDir = path.join(__dirname, '../public/documents');
  const htmlFiles = fs.readdirSync(documentsDir).filter(file => file.endsWith('.html'));
  
  if (htmlFiles.length === 0) {
    console.log('❌ No HTML files found to convert');
    return;
  }
  
  console.log(`📄 Found ${htmlFiles.length} HTML files to convert`);
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (const htmlFile of htmlFiles) {
      const htmlPath = path.join(documentsDir, htmlFile);
      const pdfPath = htmlPath.replace('.html', '.pdf');
      
      console.log(`🔄 Converting ${htmlFile} to PDF...`);
      
      const page = await browser.newPage();
      
      // Load HTML content
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      // Generate PDF
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: {
          top: '2cm',
          right: '2cm',
          bottom: '2cm',
          left: '2cm'
        },
        printBackground: true,
        displayHeaderFooter: false
      });
      
      await page.close();
      console.log(`✅ Converted: ${htmlFile} → ${htmlFile.replace('.html', '.pdf')}`);
    }
    
    console.log('\n🎉 All PDF conversions completed successfully!');
    console.log('📁 PDF files are available in:', documentsDir);
    
  } catch (error) {
    console.error('❌ Error during PDF conversion:', error);
  } finally {
    await browser.close();
  }
}

// Check if puppeteer is available
try {
  require('puppeteer');
  convertHtmlToPdf();
} catch (error) {
  console.log('📝 Puppeteer not available. Installing...');
  console.log('💡 To install puppeteer, run: npm install puppeteer');
  console.log('📄 HTML files are ready for manual PDF conversion');
  console.log('🌐 Open the HTML files in a browser and use Print → Save as PDF');
} 
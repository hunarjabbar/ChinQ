import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.ttf') || url.includes('.woff') || url.includes('.zip') || url.includes('font') || url.includes('api')) {
      console.log('Resource:', url);
    }
  });

  await page.goto('https://xoshnus.com/fonts/EB8pmR/', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();

import puppeteer from 'puppeteer';

async function diagnose() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const routes = ['/en/institute', '/ar/institute', '/zh/institute', '/ck/institute', '/en/summit'];
  const viewports = [360, 768, 1024, 1440, 1920];

  for (const r of routes) {
    for (const width of viewports) {
      await page.setViewport({ width, height: 800 });
      await page.goto(`http://localhost:3000${r}`, { waitUntil: 'networkidle2' });
      const info = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth
        };
      });
      const overflow = info.scrollWidth > info.innerWidth;
      console.log(`[${r}] ${width}px -> scrollWidth: ${info.scrollWidth} | overflow: ${overflow ? 'FAIL' : 'OK'}`);
    }
  }

  await browser.close();
}

diagnose();

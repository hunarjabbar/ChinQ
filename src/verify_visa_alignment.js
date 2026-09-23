import puppeteer from 'puppeteer';
import fs from 'fs';

async function verify() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Test across viewports
  const viewports = [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const results = {};

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/en/institute/visa-centre', { waitUntil: 'networkidle2' });

    // Measure alignment of key elements
    const metrics = await page.evaluate(() => {
      const getBox = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        return {
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          maxWidth: style.maxWidth,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
          marginLeft: style.marginLeft,
          marginRight: style.marginRight
        };
      };

      const devBadge = document.querySelector('#dev-build-info-badge');
      const bodyScrollWidth = document.body.scrollWidth;
      const htmlScrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;

      return {
        hasDevBadge: !!devBadge,
        hasHorizontalOverflow: bodyScrollWidth > innerWidth || htmlScrollWidth > innerWidth,
        bodyScrollWidth,
        htmlScrollWidth,
        innerWidth,
        headerRow1Inner: getBox('.site-header__inner'),
        disclaimerBar: getBox('#landing-top-disclaimer .page-container'),
        breadcrumbRow: getBox('.breadcrumb'),
        tabsRow: getBox('.tabs'),
        heroCard: getBox('.hero-card'),
        policyStrip: getBox('.policy-strip'),
        categoryGrid: getBox('.category-grid'),
        footerDisclaimer: getBox('#landing-footer-disclaimer')
      };
    });

    results[vp.name] = { ...vp, metrics };

    // Take screenshot
    await page.screenshot({
      path: `visa_fixed_${vp.name}_${vp.width}.png`,
      fullPage: false
    });
  }

  // Also test Arabic (RTL) at 1440
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/ar/institute/visa-centre', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `visa_fixed_ar_1440.png`, fullPage: false });

  // Chinese at 1440
  await page.goto('http://localhost:3000/zh/institute/visa-centre', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `visa_fixed_zh_1440.png`, fullPage: false });

  // Kurdish at 1440
  await page.goto('http://localhost:3000/ckb/institute/visa-centre', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `visa_fixed_ckb_1440.png`, fullPage: false });

  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});

const puppeteer = require('puppeteer');
const fs = require('fs');

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
    if (msg.type() === 'warning') consoleWarnings.push(msg.text());
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // Ensure screenshots dir exists
  if (!fs.existsSync('/tmp/hero_screenshots')) {
    fs.mkdirSync('/tmp/hero_screenshots', { recursive: true });
  }

  // 1. Viewports test (EN)
  const viewports = [
    { name: '1440px', width: 1440, height: 1000 },
    { name: '768px', width: 768, height: 1024 },
    { name: '390px', width: 390, height: 844 },
  ];

  const results = {
    viewports: {},
    locales: {},
    consoleErrors,
    consoleWarnings
  };

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle2' });
    
    // Scroll into view
    await page.evaluate(() => {
      const el = document.getElementById('initiatives');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const heroCard = await page.$('.summit-hero-card');
    if (heroCard) {
      const path = `/tmp/hero_screenshots/hero_${vp.name}.png`;
      await heroCard.screenshot({ path });
      console.log(`Saved screenshot ${path}`);
    }

    const cardData = await page.evaluate(() => {
      const card = document.querySelector('.summit-hero-card');
      if (!card) return null;
      const rect = card.getBoundingClientRect();
      const style = window.getComputedStyle(card);
      
      const eyebrow = card.querySelector('.summit-hero-card__eyebrow');
      const headline = card.querySelector('.summit-hero-card__headline');
      const body = card.querySelector('.summit-hero-card__body');
      const chips = Array.from(card.querySelectorAll('.summit-hero-card__chips li')).map(l => l.innerText.trim());
      const actions = Array.from(card.querySelectorAll('.summit-hero-card__cta')).map(a => a.innerText.trim());

      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        background: style.background,
        color: style.color,
        eyebrow: eyebrow ? eyebrow.innerText.trim() : null,
        headline: headline ? headline.innerText.trim() : null,
        body: body ? body.innerText.trim() : null,
        chips,
        actions
      };
    });

    results.viewports[vp.name] = cardData;
  }

  // 2. Locales test at 1440px
  await page.setViewport({ width: 1440, height: 1000 });
  const locales = ['en', 'ar', 'zh', 'ckb'];

  for (const loc of locales) {
    await page.goto(`http://localhost:3000/${loc}`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const el = document.getElementById('initiatives');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const heroCard = await page.$('.summit-hero-card');
    if (heroCard) {
      const path = `/tmp/hero_screenshots/hero_locale_${loc}.png`;
      await heroCard.screenshot({ path });
      console.log(`Saved screenshot ${path}`);
    }

    const cardData = await page.evaluate(() => {
      const card = document.querySelector('.summit-hero-card');
      if (!card) return null;
      const eyebrow = card.querySelector('.summit-hero-card__eyebrow');
      const headline = card.querySelector('.summit-hero-card__headline');
      const body = card.querySelector('.summit-hero-card__body');
      const chips = Array.from(card.querySelectorAll('.summit-hero-card__chips li')).map(l => l.innerText.trim());
      const actions = Array.from(card.querySelectorAll('.summit-hero-card__cta')).map(a => a.innerText.trim());

      return {
        eyebrow: eyebrow ? eyebrow.innerText.trim() : null,
        headline: headline ? headline.innerText.trim() : null,
        body: body ? body.innerText.trim() : null,
        chips,
        actions
      };
    });

    results.locales[loc] = cardData;
  }

  console.log('RESULTS_JSON_START');
  console.log(JSON.stringify(results, null, 2));
  console.log('RESULTS_JSON_END');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

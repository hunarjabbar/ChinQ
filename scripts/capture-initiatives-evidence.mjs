import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'artifacts');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const locales = [
    { code: 'en', name: 'English', file: 'initiatives-en-rendered.png' },
    { code: 'ar', name: 'Arabic', file: 'initiatives-ar-rendered.png' },
    { code: 'zh', name: 'Chinese', file: 'initiatives-zh-rendered.png' },
    { code: 'ck', name: 'Kurdish (Sorani)', file: 'initiatives-ckb-rendered.png' },
  ];

  const domProof = {};

  for (const loc of locales) {
    const url = `http://localhost:3000/${loc.code}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll initiatives section into view
    const section = await page.$('section#initiatives');
    if (!section) {
      console.error(`section#initiatives not found on ${url}`);
      continue;
    }

    await section.scrollIntoView();
    await new Promise(r => setTimeout(r, 500));

    // Extract DOM metrics and text from the cards
    const cardData = await page.evaluate(() => {
      const sec = document.querySelector('section#initiatives');
      if (!sec) return null;
      const heading = sec.querySelector('h2')?.textContent?.trim();
      const subheading = sec.querySelector('p')?.textContent?.trim();
      const cards = Array.from(sec.querySelectorAll('.initiative-card, div.grid > div')).map(card => {
        const eyebrow = card.querySelector('span')?.textContent?.trim();
        const headline = card.querySelector('h3')?.textContent?.trim();
        const body = card.querySelector('p')?.textContent?.trim();
        const cta = card.querySelector('a')?.textContent?.trim();
        const computed = window.getComputedStyle(card);
        const pComputed = card.querySelector('p') ? window.getComputedStyle(card.querySelector('p')) : null;
        return {
          eyebrow,
          headline,
          body,
          bodyLength: body ? body.length : 0,
          cta,
          lineClamp: pComputed ? pComputed.webkitLineClamp : 'none',
          maxHeight: computed.maxHeight,
          height: computed.height,
          border: computed.border,
          boxShadow: computed.boxShadow
        };
      });
      return { heading, subheading, cards };
    });

    domProof[loc.code] = cardData;
    console.log(`[${loc.code}] Heading: ${cardData.heading}`);
    cardData.cards.forEach((c, idx) => {
      console.log(`  Card ${idx + 1} (${c.headline}): length=${c.bodyLength}, text="${c.body?.slice(0, 60)}..."`);
    });

    const screenshotPath = path.join(outDir, loc.file);
    await section.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot to ${screenshotPath}`);
  }

  // Capture Header Initiatives Dropdown
  console.log('Capturing Initiatives dropdown...');
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // Find the button with text containing Initiatives / nav.initiatives
  const buttons = await page.$$('header button');
  let initiativesBtn = null;
  for (const btn of buttons) {
    const txt = await page.evaluate(el => el.textContent, btn);
    if (txt && txt.toLowerCase().includes('initiatives')) {
      initiativesBtn = btn;
      break;
    }
  }

  if (initiativesBtn) {
    await initiativesBtn.hover();
    await new Promise(r => setTimeout(r, 400));
    const headerEl = await page.$('header');
    if (headerEl) {
      const dropdownPath = path.join(outDir, 'initiatives-dropdown-rendered.png');
      await headerEl.screenshot({ path: dropdownPath });
      console.log(`Saved dropdown screenshot to ${dropdownPath}`);
    }
  }

  // Capture hover glow effect on middle card
  console.log('Capturing card hover glow effect...');
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle2' });
  const sec = await page.$('section#initiatives');
  await sec.scrollIntoView();
  await new Promise(r => setTimeout(r, 500));

  const secondCard = await page.$('section#initiatives div.grid > div:nth-child(2)');
  if (secondCard) {
    await secondCard.hover();
    await new Promise(r => setTimeout(r, 400));
    const hoverStyles = await page.evaluate(el => {
      const s = window.getComputedStyle(el);
      return {
        borderColor: s.borderColor,
        boxShadow: s.boxShadow,
        transform: s.transform
      };
    }, secondCard);
    domProof.hoverGlow = hoverStyles;
    console.log('Hover glow styles:', hoverStyles);
    const glowPath = path.join(outDir, 'initiatives-card-hover-glow.png');
    await sec.screenshot({ path: glowPath });
    console.log(`Saved hover glow screenshot to ${glowPath}`);
  }

  fs.writeFileSync(path.join(outDir, 'dom-proof.json'), JSON.stringify(domProof, null, 2));
  console.log('Saved dom-proof.json');

  await browser.close();
  console.log('Screenshot capture run completed.');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

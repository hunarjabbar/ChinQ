const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle2' });

  // Scroll into view to trigger IntersectionObserver
  await page.evaluate(() => {
    const el = document.getElementById('initiatives');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));

  const initiativesSec = await page.$('#initiatives');
  if (initiativesSec) {
    await initiativesSec.screenshot({ path: '/tmp/initiatives_section_1440.png' });
    console.log('Saved /tmp/initiatives_section_1440.png');
  }

  // Get details about the hero card and all its text/elements
  const audit = await page.evaluate(() => {
    const sec = document.querySelector('#initiatives');
    if (!sec) return { error: 'no #initiatives' };

    const heroCard = sec.querySelector('.relative.rounded-2xl');
    if (!heroCard) return { error: 'no heroCard' };

    const texts = Array.from(heroCard.querySelectorAll('h3, p, span, a')).map(el => ({
      tag: el.tagName,
      text: el.innerText.trim(),
      color: window.getComputedStyle(el).color,
      backgroundColor: window.getComputedStyle(el).backgroundColor,
      opacity: window.getComputedStyle(el).opacity,
      display: window.getComputedStyle(el).display,
      visibility: window.getComputedStyle(el).visibility,
      rect: {
        top: Math.round(el.getBoundingClientRect().top),
        left: Math.round(el.getBoundingClientRect().left),
        width: Math.round(el.getBoundingClientRect().width),
        height: Math.round(el.getBoundingClientRect().height)
      }
    }));

    return {
      heroRect: heroCard.getBoundingClientRect(),
      texts
    };
  });

  console.log(JSON.stringify(audit, null, 2));

  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});

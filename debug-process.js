const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`BROWSER ${msg.type().toUpperCase()}:`, msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('BROWSER PAGE ERROR:', err.message);
  });
  
  await page.goto('http://localhost:3000/process', { waitUntil: 'networkidle2' });
  
  // Wait for GSAP to do its thing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const metrics = await page.evaluate(() => {
    const cards = document.querySelectorAll('.card');
    const images = document.querySelectorAll('.card-img img');
    return {
      cardsLength: cards.length,
      imagesLength: images.length,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      card1Style: cards[0] ? cards[0].getAttribute('style') : null,
      img1Style: images[0] ? images[0].getAttribute('style') : null,
      card2ImgStyle: images[1] ? images[1].getAttribute('style') : null
    };
  });
  
  console.log('METRICS:', JSON.stringify(metrics, null, 2));
  
  await browser.close();
})();

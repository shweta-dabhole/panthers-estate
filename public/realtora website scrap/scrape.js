const scrape = require('website-scraper').default;
const PuppeteerPlugin = require('website-scraper-puppeteer').default;

scrape({
    urls: ['https://realtora.framer.ai/'],
    directory: './realtora_framer',
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { headless: true }, /* optional */
            scrollToBottom: { timeout: 10000, viewportN: 10 }, /* optional */
            blockNavigation: true, /* optional */
        })
    ],
    sources: [
        {selector: 'img', attr: 'src'},
        {selector: 'link[rel="stylesheet"]', attr: 'href'},
        {selector: 'script', attr: 'src'},
        {selector: 'source', attr: 'src'},
        {selector: 'video', attr: 'src'},
        {selector: 'a', attr: 'href'},
        // add more selectors as needed to catch all framer assets
        {selector: '[style]', attr: 'style'},
    ],
    requestConcurrency: 5,
    maxDepth: 1, // To avoid crawling everything, just the main page and its assets
}).then(() => {
    console.log("Entire website downloaded successfully!");
}).catch((err) => {
    console.error("Error occurred while scraping:", err);
});

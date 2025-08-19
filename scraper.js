// scraper.js
const { chromium } = require('playwright');

// Array of all URLs to be scraped
const URLS = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=71',
    'https://sanand0.github.io/tdsdata/js_table/?seed=72',
    'https://sanand0.github.io/tdsdata/js_table/?seed=73',
    'https://sanand0.github.io/tdsdata/js_table/?seed=74',
    'https://sanand0.github.io/tdsdata/js_table/?seed=75',
    'https://sanand0.github.io/tdsdata/js_table/?seed=76',
    'https://sanand0.github.io/tdsdata/js_table/?seed=77',
    'https://sanand0.github.io/tdsdata/js_table/?seed=78',
    'https://sanand0.github.io/tdsdata/js_table/?seed=79',
    'https://sanand0.github.io/tdsdata/js_table/?seed=80'
];

async function scrapeAndSum() {
    let grandTotal = 0;
    const browser = await chromium.launch();
    const page = await browser.newPage();

    console.log('Starting scraping process...');

    for (const url of URLS) {
        try {
            console.log(`Navigating to ${url}`);
            await page.goto(url, { waitUntil: 'networkidle' });

            const pageSum = await page.evaluate(() => {
                let sum = 0;
                // This selector finds all <td> cells inside a <table>
                const cells = document.querySelectorAll('table td');
                cells.forEach(cell => {
                    const number = parseFloat(cell.textContent.trim());
                    if (!isNaN(number)) {
                        sum += number;
                    }
                });
                return sum;
            });

            console.log(`Sum for this page: ${pageSum}`);
            grandTotal += pageSum;

        } catch (error) {
            console.error(`Failed to process ${url}: ${error.message}`);
        }
    }

    await browser.close();
    
    // The final answer is printed here
    console.log('\n=======================================');
    console.log(`THE FINAL TOTAL SUM IS: ${grandTotal}`);
    console.log('=======================================');
}

scrapeAndSum();

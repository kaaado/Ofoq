import { chromium } from 'playwright';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Reset sessionStorage to force Horizon entrance to play
  await page.addInitScript(() => {
    try {
      window.sessionStorage.clear();
      window.localStorage.removeItem('ofoq_horizon_played');
    } catch (e) {}
  });

  // Navigate to local dev server (port 5173 or preview port)
  try {
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    console.log('Local dev server not on 5173, checking 4173...');
    await page.goto('http://localhost:4173', { waitUntil: 'domcontentloaded', timeout: 5000 });
  }

  // Wait 400ms for horizon opening beam to radiate
  await page.waitForTimeout(450);

  const screenshotPath = 'C:\\Users\\APL TECH\\.gemini\\antigravity\\brain\\705c61dd-fb34-4bdc-9a4a-07af70d2d312\\screenshots\\horizon_radiant_entrance.png';
  await page.screenshot({ path: screenshotPath });
  console.log('Saved screenshot to:', screenshotPath);

  await browser.close();
}

main().catch(console.error);

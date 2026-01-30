import { chromium } from 'playwright';
import { scrapeWorkiJobs } from './worki.playwright';

export async function scrapeWorki() {
  const browser = await chromium.launch({ headless: true });

  try {
    const jobs = await scrapeWorkiJobs(browser);
    return jobs;
  } finally {
    await browser.close();
  }
}

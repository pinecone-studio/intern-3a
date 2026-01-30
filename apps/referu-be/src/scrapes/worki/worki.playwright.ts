import { Browser } from 'playwright';
import jobIds from '../../assets/data/jobs.json';

type JobIdMap = {
  id: string;
  title: string;
};

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function findJobIdByTitle(title: string): string | null {
  const found = (jobIds as JobIdMap[]).find((j) => normalize(j.title) === normalize(title));
  return found ? found.id : null;
}

export async function scrapeWorkiJobs(browser: Browser) {
  const page = await browser.newPage();

  await page.goto('https://worki.mn/job?tab=6', {
    waitUntil: 'networkidle',
  });

  await page.waitForSelector('.job-card');

  const jobs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.job-card')).map((card) => {
      const rawTitle = card.querySelector('p.name')?.textContent?.trim() ?? '';

      const title = rawTitle
        .split(' ')
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
        .join(' ');

      const company = card.querySelector('.company-name-text')?.textContent?.trim() ?? '';

      const salary = card.querySelector('p.salary')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

      const type = card.querySelector('.position-name-text p')?.textContent?.trim() ?? '';

      return { title, company, salary, type };
    });
  });

  const merged = jobs.map((job) => {
    const jobId = findJobIdByTitle(job.title);
    return {
      ...job,
      link: jobId ? `https://worki.mn/job/${jobId}` : '',
    };
  });

  return merged.filter((j) => j.title && j.company);
}

import { chromium } from 'playwright';
import { Job } from '../types/job';

const JOB_ROLES: Record<string, string[]> = {
  frontend: ['frontend', 'front-end'],
  backend: ['backend', 'back-end'],
  fullstack: ['fullstack', 'full stack'],
  accountant: ['нягтлан', 'accountant'],
  marketing_manager: ['marketing manager', 'маркетингийн менежер'],
  digital_marketing: ['digital marketing', 'дижитал маркетинг'],
  hr: ['human resource', 'hr', 'хүний нөөц'],
  sales_rep: ['худалдааны төлөөлөгч', 'sales representative'],
  customer_service: ['харилцагч', 'customer'],
  sales: ['борлуулалт', 'sales'],
};

function detectRole(title: string): string | null {
  const lower = title.toLowerCase();
  for (const [role, keywords] of Object.entries(JOB_ROLES)) {
    if (keywords.some((k) => lower.includes(k))) return role;
  }
  return null;
}

export const scrapeWorki = async (): Promise<Job[]> => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://worki.mn/job?tab=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const jobsList = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href^="/job/"]')).map((a) => ({
      title: a.textContent?.trim() || '',
      url: 'https://worki.mn' + a.getAttribute('href'),
    })),
  );
  const collectedRoles = new Set<string>();
  const result: Job[] = [];

  for (const job of jobsList) {
    if (result.length >= 10) break;

    const role = detectRole(job.title);
    if (!role || collectedRoles.has(role)) continue; // skip if role already collected

    // 2️⃣ detail page
    const detailPage = await page.context().newPage();
    await detailPage.goto(job.url, { waitUntil: 'networkidle' });
    const detailData = await detailPage.evaluate(() => {
      const getText = (label: string) => {
        const el = Array.from(document.querySelectorAll('div')).find((d) => d.textContent?.includes(label));
        return el?.nextElementSibling?.textContent?.trim() || null;
      };
      return {
        salaryRange: getText('Цалин'),
        jobType: getText('Ажлын цаг'),
      };
    });
    await detailPage.close();

    const jobId = job.url.split('/job/')[1];

    result.push({
      role,
      title: job.title,
      salaryRange: detailData.salaryRange,
      jobType: detailData.jobType,
      detailUrl: job.url,
      jobId,
    });

    collectedRoles.add(role);
  }

  await browser.close();
  return result;
};

import cron from 'node-cron';
import { scrapeWorki } from '../scraper/worki.scraper';
import { Job } from '../types/job';
import { JobModel } from '../libs/models/JobModel';

export const startWorkiCron = () => {
  cron.schedule('0 */6 * * *', async () => {
    console.log('⏰ Scraping Worki.mn...');
    try {
      const jobs: Job[] = await scrapeWorki();

      for (const job of jobs) {
        await JobModel.updateOne({ jobId: job.jobId }, { $set: job }, { upsert: true });
      }

      console.log(`✅ ${jobs.length} jobs saved`);
    } catch (err) {
      console.error('❌ Scraping failed', err);
    }
  });
};

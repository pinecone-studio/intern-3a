import { Router } from 'express';
import { scrapeWorki } from '../scrapes/worki/worki.scraper';

const router = Router();

router.get('/scrape/worki', async (req, res) => {
  try {
    const jobs = await scrapeWorki();
    res.json({
      source: 'worki.mn',
      total: jobs.length,
      data: jobs,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'scrape failed' });
  }
});

export default router;

import { Request, Response } from 'express';
import { JobModel } from '../../libs/models/JobModel';

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 }).limit(10);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

export const getAllReferralsHR = async (req: Request, res: Response) => {
  try {
    const allReferralsHR = await Referral.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Referrals fetched successfully',
      data: allReferralsHR,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get referrals',
    });
  }
};

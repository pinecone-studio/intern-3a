import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

export const getAllReferrals = async (req: Request, res: Response) => {
  try {
    const allReferrals = await Referral.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Referrals fetched successfully',
      data: allReferrals,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get referrals',
    });
  }
};

import { getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';
import { User } from '../../libs/models/User';

export const getAllReferrals = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const existingUser = await User.findOne({ employeeClerkId: userId });

  if (!existingUser) {
    return res.status(404).json({
      error: 'User profile not found',
    });
  }

  try {
    const allReferrals = await Referral.find({ referringEmployeeId: existingUser._id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Referrals fetched successfully',
      data: allReferrals,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get referrals',
    });
  }
};

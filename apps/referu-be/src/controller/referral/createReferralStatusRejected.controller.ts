import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

export const createReferralStatusRejected = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hrReferralStatus = await Referral.findByIdAndUpdate(id, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date(), bonusAmount: 0 }, { new: true });

    if (!hrReferralStatus) {
      return res.status(400).json({ message: 'Referral not found' });
    }

    res.status(200).json({
      message: 'Referral status updated to rejected',
      data: hrReferralStatus,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to reject referral',
    });
  }
};

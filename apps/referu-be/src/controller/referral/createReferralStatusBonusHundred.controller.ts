import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

export const createReferralStatusBonusHundred = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hrReferralStatus = await Referral.findByIdAndUpdate(id, { referralStatus: 'BONUS100', referralStatusUpdatedAt: new Date(), bonusAmount: 100000 }, { new: true });

    if (!hrReferralStatus) {
      return res.status(400).json({ message: 'Referral not found' });
    }
    await Referral.updateMany({ postedJobId: hrReferralStatus.postedJobId, _id: { $ne: hrReferralStatus._id } }, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date() });

    res.status(200).json({
      message: 'Referral status updated successfully',
      data: hrReferralStatus,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update referral status',
    });
  }
};

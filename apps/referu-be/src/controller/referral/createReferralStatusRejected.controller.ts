import Ably from 'ably';
import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

// export const createReferralStatusRejected = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const hrReferralStatus = await Referral.findByIdAndUpdate(id, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date(), bonusAmount: 0 }, { new: true });

//     if (!hrReferralStatus) {
//       return res.status(400).json({ message: 'Referral not found' });
//     }

//     //ably
//     const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
//     // Inside your createReferralStatusBonusHundred
//     await ably.channels.get('sessions').publish('session-created', {
//       refresh: true,
//       jobId: jobId,
//     });

//     res.status(200).json({
//       message: 'Referral status updated to rejected',
//       data: hrReferralStatus,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to reject referral',
//     });
//   }
// };

export const createReferralStatusRejected = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hrReferralStatus = await Referral.findByIdAndUpdate(
      id,
      {
        referralStatus: 'REJECTED',
        referralStatusUpdatedAt: new Date(),
        bonusAmount: 0,
      },
      { new: true },
    );

    if (!hrReferralStatus) {
      return res.status(400).json({ message: 'Referral not found' });
    }

    // Ably: Notify frontend to refresh
    try {
      const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY as string });
      await ably.channels.get('sessions').publish('session-created', {
        refresh: true,
        jobId: hrReferralStatus.postedJobId, // Use the ID from the database record
      });
    } catch (ablyError) {
      console.error('Ably Publish Error:', ablyError);
      // We don't return 500 here because the DB update actually succeeded
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

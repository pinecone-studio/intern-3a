import Ably from 'ably';
import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

// export const createReferralStatusBonusTwoHundred = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const hrReferralStatus = await Referral.findByIdAndUpdate(id, { referralStatus: 'BONUS200', referralStatusUpdatedAt: new Date(), bonusAmount: 200000 }, { new: true });

//     if (!hrReferralStatus) {
//       return res.status(400).json({ message: 'Referral not found' });
//     }

//     await Referral.updateMany({ postedJobId: hrReferralStatus.postedJobId, _id: { $ne: hrReferralStatus._id } }, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date() });

//      //ably
//         const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
//         // Inside your createReferralStatusBonusHundred
//         await ably.channels.get('sessions').publish('session-created', {
//           refresh: true,
//           jobId: jobId,
//         });

//     res.status(200).json({
//       message: 'Referral status updated successfully',
//       data: hrReferralStatus,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to update referral status',
//     });
//   }
// };

export const createReferralStatusBonusTwoHundred = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hrReferralStatus = await Referral.findByIdAndUpdate(
      id,
      {
        referralStatus: 'BONUS200',
        referralStatusUpdatedAt: new Date(),
        bonusAmount: 200000,
      },
      { new: true },
    );

    if (!hrReferralStatus) {
      return res.status(400).json({ message: 'Referral not found' });
    }

    // Reject others for the same job
    await Referral.updateMany({ postedJobId: hrReferralStatus.postedJobId, _id: { $ne: hrReferralStatus._id } }, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date() });

    // Ably Notification
    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('sessions').publish('session-created', {
      refresh: true,
      jobId: hrReferralStatus.postedJobId, // Fixed: use property from the doc
    });

    res.status(200).json({
      message: 'Referral status updated successfully',
      data: hrReferralStatus,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update referral status' });
  }
};

// // import { Request, Response } from 'express';
// // import { Referral } from '../../libs/models/Referral';

// // export const createReferralStatusBonusHundred = async (req: Request, res: Response) => {
// //   try {
// //     const { id } = req.params;

// //     const hrReferralStatus = await Referral.findByIdAndUpdate(id, { referralStatus: 'BONUS100', referralStatusUpdatedAt: new Date(), bonusAmount: 100000 }, { new: true });

// //     if (!hrReferralStatus) {
// //       return res.status(400).json({ message: 'Referral not found' });
// //     }
// //     await Referral.updateMany({ postedJobId: hrReferralStatus.postedJobId, _id: { $ne: hrReferralStatus._id } }, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date() });

// //     res.status(200).json({
// //       message: 'Referral status updated successfully',
// //       data: hrReferralStatus,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       error: 'Failed to update referral status',
// //     });
// //   }
// // };

import Ably from 'ably';
import { Request, Response } from 'express';
import { Types } from 'mongoose'; // Import Types
import { Referral } from '../../libs/models/Referral';

// export const createReferralStatusBonusHundred = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { jobId } = req.query;

//     const hrReferralStatus = await Referral.findByIdAndUpdate(id, { referralStatus: 'BONUS100', referralStatusUpdatedAt: new Date(), bonusAmount: 100000 }, { new: true });

//     if (!hrReferralStatus) {
//       return res.status(400).json({ message: 'Referral not found' });
//     }
//     // await Referral.updateMany({ postedJobId: hrReferralStatus.postedJobId, _id: { $ne: hrReferralStatus._id } }, { referralStatus: 'REJECTED', referralStatusUpdatedAt: new Date() });

//     // if (hrReferralStatus.postedJobId) {
//     //   const result = await Referral.updateMany(
//     //     {
//     //       // 2. Explicitly cast to ObjectId if your schema uses it
//     //       postedJobId: new Types.ObjectId(hrReferralStatus.postedJobId as string),
//     //       _id: { $ne: hrReferralStatus._id },
//     //     },
//     //     {
//     //       $set: {
//     //         // 3. Use $set explicitly for clarity
//     //         referralStatus: 'REJECTED',
//     //         referralStatusUpdatedAt: new Date(),
//     //       },
//     //     },
//     //   );

//     if (jobId) {
//       await Referral.updateMany(
//         {
//           postedJobId: jobId, // Filter by the Job ID
//           _id: { $ne: id }, // Exclude the one we just promoted
//         },
//         {
//           $set: {
//             referralStatus: 'REJECTED',
//             referralStatusUpdatedAt: new Date(),
//           },
//         },
//       );
//     }

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

export const createReferralStatusBonusHundred = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { jobId } = req.query; // Extracted from ?jobId=...

    // 1. Update the chosen candidate to BONUS100
    const hrReferralStatus = await Referral.findByIdAndUpdate(
      id,
      {
        referralStatus: 'BONUS100',
        referralStatusUpdatedAt: new Date(),
        bonusAmount: 100000,
      },
      { new: true },
    );

    if (!hrReferralStatus) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    // 2. Reject everyone else for this specific job
    if (jobId) {
      await Referral.updateMany(
        {
          postedJobId: jobId, // Filter by the Job ID
          _id: { $ne: id }, // Exclude the one we just promoted
        },
        {
          $set: {
            referralStatus: 'REJECTED',
            referralStatusUpdatedAt: new Date(),
          },
        },
      );
    }

    //ably
    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    // Inside your createReferralStatusBonusHundred
    await ably.channels.get('sessions').publish('session-created', {
      refresh: true,
      jobId: jobId,
    });
    res.status(200).json({
      message: 'Winner selected; other candidates rejected.',
      data: hrReferralStatus,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process referral update' });
  }
};

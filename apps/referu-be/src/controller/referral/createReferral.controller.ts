import { getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';
import { User } from '../../libs/models/User';
import { uploadResumeToCloudinary } from '../../libs/uploadPdf';

export const createReferral = async (req: Request, res: Response) => {
  try {
    let resumeUrl = '';

    if (req.file) {
      resumeUrl = await uploadResumeToCloudinary(req.file.buffer, req.file.originalname);
    }

    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const existingUser = await User.findOne({ employeeClerkId: userId });

    const referringEmployeeId = existingUser._id;

    const referralData = {
      ...req.body,
      candidateResume: resumeUrl,
      referringEmployeeId,
    };

    const referral = await Referral.create(referralData);

    res.status(201).json({ message: 'Referral created successfully', referral });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating referral', error: error });
  }
};

import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';
import { uploadResumeToCloudinary } from '../../libs/uploadPdf';

export const createReferral = async (req: Request, res: Response) => {
  try {
    let resumeUrl = '';

    if (req.file) {
      resumeUrl = await uploadResumeToCloudinary(req.file.buffer, req.file.originalname);
    }
    console.log('FILE 👉', req.file);

    const referralData = {
      ...req.body,
      candidateResume: resumeUrl,
    };
    console.log('BODY 👉', req.body);

    const referral = await Referral.create(referralData);
    console.log(referral);

    res.status(201).json({ message: 'Referral created successfully', referral });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while creating referral', error: error });
  }
};

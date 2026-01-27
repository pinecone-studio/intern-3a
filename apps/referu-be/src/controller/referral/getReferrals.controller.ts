import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

export const getAllReferrals = async (req: Request, res: Response) => {
  try {
    const allReferrals = await Referral.find();
    res.send({ message: 'Found all referrals!', data: allReferrals });
  } catch (error) {
    res.status(500).send('Error while getting referrals!');
  }
};

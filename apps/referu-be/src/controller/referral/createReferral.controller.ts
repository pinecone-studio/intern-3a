import { Request, Response } from 'express';
import { Referral } from '../../libs/models/Referral';

export const createReferral = async (req: Request, res: Response) => {
  console.log('BODY 👉', req.body);
  console.log('HEADERS 👉', req.headers);
  try {
    await Referral.create(req.body);
    res.send('Referral created successfully!');
  } catch (error) {
    res.status(500).send('Error while creating referral!');
  }
};

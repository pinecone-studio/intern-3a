import { Request, Response } from 'express';
import { User } from '../../libs/models/User';

export const getUserById = async (req: Request, res: Response) => {
  //req.body
  //req.params
  //req.query
  try {
    const uniqueUser = await User.find();
    res.send({ message: 'Found user!', data: uniqueUser });
  } catch (error) {
    res.status(500).send('Error while getting user!');
  }
};

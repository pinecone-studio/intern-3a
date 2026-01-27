import { Request, Response } from 'express';
import { User } from '../../libs/models/User';

export const checkUser = async (req: Request, res: Response) => {
  try {
    const clerkId = req.clerkId;

    const user = await User.findOne({ employeeClerkId: clerkId });

    if (!user) return res.status(404).json({ error: 'User not found!' });

    res.json({ message: 'User exists!', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error!' });
  }
};

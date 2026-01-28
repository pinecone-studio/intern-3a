import { clerkClient, getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { User } from '../../libs/models/User';

export const checkUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await User.findOne({ employeeClerkId: userId });

    if (!user) return res.status(404).json({ error: 'User not found!' });

    res.json({ message: 'User exists!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error!' });
  }
};

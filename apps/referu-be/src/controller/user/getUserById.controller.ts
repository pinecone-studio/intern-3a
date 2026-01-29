import { getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { User } from '../../libs/models/User';

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const existingUser = await User.findOne({ employeeClerkId: userId });

    res.send({ message: 'Found user!', data: existingUser });
  } catch (error) {
    res.status(500).send('Error while finding user!');
  }
};

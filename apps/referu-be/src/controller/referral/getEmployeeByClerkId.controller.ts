import { getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { User } from '../../libs/models/User';

export const getEmployeeByClerkId = async (req: Request, res: Response) => {
  const { clerkId } = req.params;

  try {
    const employee = await User.findOne({ employeeClerkId: clerkId });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    res.json({ data: employee });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

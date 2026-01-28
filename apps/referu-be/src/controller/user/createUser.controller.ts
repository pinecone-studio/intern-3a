import { Request, Response } from 'express';
import { User } from '../../libs/models/User';
import { jobTypeMNtoEN } from '../../types/get-job-type-en';

export const createUser = async (req: any, res: Response) => {
  try {
    const clerkId = req.clerkId;
    const clerkUser = req.clerkUser;

    const existing = await User.findOne({ employeeClerkId: clerkId });

    if (existing) return res.status(409).json({ error: 'User already exists!' });

    const { employeeTelNumber, employeeDepartment, employeeJobTitle, employeeJobLevel, employeeJobType } = req.body;

    if (!employeeTelNumber || !employeeDepartment || !employeeJobTitle || !employeeJobLevel || !employeeJobType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('BODY 👉', req.body);
    console.log('HEADERS 👉', req.headers);

    const newUser = await User.create({
      employeeClerkId: clerkId,
      employeeLastName: clerkUser.employeeLastName,
      employeeFirstName: clerkUser.employeeFirstName,
      employeeEmail: clerkUser.employeeEmail,
      employeeTelNumber,
      employeeDepartment,
      employeeJobTitle,
      employeeJobLevel,
      employeeJobType: jobTypeMNtoEN(employeeJobType),
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

import { clerkClient, getAuth } from '@clerk/express';
import { Request, Response } from 'express';
import { User } from '../../libs/models/User';
import { jobLevelMNtoEN } from '../../types/get-job-level-en';
import { jobTypeMNtoEN } from '../../types/get-job-type-en';

export const createUser = async (req: any, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const existing = await User.findOne({ employeeClerkId: userId });

    if (existing) return res.status(409).json({ error: 'User already exists!' });

    const clerkUser = await clerkClient.users.getUser(userId);

    const { employeeTelNumber, employeeDepartment, employeeJobTitle, employeeJobLevel, employeeJobType } = req.body;

    if (!employeeTelNumber || !employeeDepartment || !employeeJobTitle || !employeeJobLevel || !employeeJobType) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    console.log({ employeeTelNumber, employeeDepartment, employeeJobTitle, employeeJobLevel, employeeJobType });
    const employeeFirstName = clerkUser.firstName ?? 'Employee';
    const employeeLastName = clerkUser.lastName ?? 'Dear';
    const employeeEmail = clerkUser.emailAddresses?.[0]?.emailAddress;
    console.log({ employeeFirstName, employeeLastName, employeeEmail });
    const newUser = await User.create({
      employeeClerkId: userId,
      employeeLastName,
      employeeFirstName,
      employeeEmail,
      employeeTelNumber,
      employeeDepartment,
      employeeJobTitle,
      employeeJobLevel: jobLevelMNtoEN(employeeJobLevel),
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

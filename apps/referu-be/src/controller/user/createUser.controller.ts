import { Request, Response } from 'express';
import { User } from '../../libs/models/User';

export const createUser = async (req: Request, res: Response) => {
  const { employeeClerkId, employeeLastName, employeeFirstName, employeeEmail, employeeTelNumber, employeeDepartment, employeeJobTitle, employeeJobType, employeeJobLevel } = req.body;

  if (!employeeClerkId || !employeeLastName || !employeeFirstName || !employeeEmail || !employeeTelNumber || !employeeDepartment || !employeeJobTitle || !employeeJobType || !employeeJobLevel) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  console.log('BODY 👉', req.body);
  console.log('HEADERS 👉', req.headers);
  try {
    const existingUser = await User.findOne({ employeeEmail });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists!' });
    }

    const newUser = await User.create(req.body);
    res.json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

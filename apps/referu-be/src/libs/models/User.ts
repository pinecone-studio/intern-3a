import mongoose, { Schema } from 'mongoose';

export type UserSchemaType = {
  employeeClerkId: string;
  employeeLastName: string;
  employeeFirstName: string;
  employeeEmail: string;
  employeeTelNumber: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobType: 'FULL_TIME' | 'PART_TIME' | 'SHIFT_BASED' | 'SEASONAL' | 'CONTRACT' | 'TEMPORARY' | 'OTHER';
  employeeJobLevel: ' EXECUTIVE' | 'UNIT_DIRECTOR' | 'UNIT_HEAD' | 'SENIOR_MANAGER' | 'MANAGER' | 'SENIOR_SPECIALIST' | 'SPECIALIST' | 'SENIOR_STAFF' | 'EMPLOYEE' | 'INTERN' | 'OTHER';
};

export const UserSchema = new Schema(
  {
    employeeClerkId: { type: String, required: true },
    employeeLastName: { type: String, required: true },
    employeeFirstName: { type: String, required: true },
    employeeEmail: { type: String, required: true },
    employeeTelNumber: { type: String },
    employeeDepartment: { type: String },
    employeeJobTitle: { type: String },
    employeeJobType: { type: String, enum: ['FULL_TIME', 'PART_TIME', 'SHIFT_BASED', 'SEASONAL', 'CONTRACT', 'TEMPORARY', 'OTHER'] },
    employeeJobLevel: {
      type: String,
      enum: ['EXECUTIVE', 'UNIT_DIRECTOR', 'UNIT_HEAD', 'SENIOR_MANAGER', 'MANAGER', 'SENIOR_SPECIALIST', 'SPECIALIST', 'SENIOR_STAFF', 'EMPLOYEE', 'INTERN', 'OTHER'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = mongoose.models.User || mongoose.model<UserSchemaType>('User', UserSchema);

import { Card, CardContent } from '@intern-3a/shadcn';
import { Briefcase, Mail, User } from 'lucide-react';
import React from 'react';

type Employee = {
  _id: string;
  employeeClerkId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobLevel: string;
  employeeEmail: string;
};

type ProfileCardProps = {
  employee: Employee;
};

export const ProfileCard = ({ employee }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      <CardContent className="p-0">
        <div className="flex items-center p-5 gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-inner">
              <User className="w-8 h-8 text-white" />
            </div>

            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base leading-tight">
                {employee.employeeLastName.charAt(0)}. {employee.employeeFirstName}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{employee.employeeJobLevel}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center text-sm text-slate-500">
                <Briefcase className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                <span>{employee.employeeJobTitle}</span>
              </div>
              <div className="flex items-center text-xs text-slate-400">
                <Mail className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                <span>{employee.employeeEmail}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 mx-5 pt-2 border-t border-dotted border-slate-200">
          <p className="text-[12px] pt-2 font-medium text-slate-600 uppercase">{employee.employeeDepartment}</p>
        </div>
      </CardContent>
    </Card>
  );
};

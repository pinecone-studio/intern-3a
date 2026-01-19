import { Card, CardContent } from '@intern-3a/shadcn';
import { mockEmployeeData } from 'apps/referu-employee-fe/src/libs/utils/get-datas';
import React from 'react';

export const ReferPageEmployeeDetail = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="text-[15px] text-muted-foreground font-semibold">Санал болгогч ажилтны мэдээлэл</div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Нэр:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeLastName.split('')[0]}.</span>
              <span> {mockEmployeeData.employeeFirstName}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-muted-foreground">Хэлтэс:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeDepartment}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-muted-foreground">Түвшин:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeJobLevel}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-muted-foreground">Төрөл:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeJobType}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-muted-foreground">Утас:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeTelNumber}</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Цахим хаяг:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeEmail}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

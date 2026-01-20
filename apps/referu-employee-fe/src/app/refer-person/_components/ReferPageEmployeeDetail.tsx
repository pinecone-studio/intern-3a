import { Card, CardContent } from '@intern-3a/shadcn';
import { mockEmployeeData } from 'apps/referu-employee-fe/src/libs/utils/get-datas';
import { getJobLevelMN } from 'apps/referu-employee-fe/src/libs/utils/get-job-level-mn';
import { getJobTypeMN } from 'apps/referu-employee-fe/src/libs/utils/get-job-type-mn';
import React from 'react';

export const ReferPageEmployeeDetail = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 text-sm">
        <div className="text-lg text-muted-foreground font-semibold">Санал болгогч ажилтны мэдээлэл</div>

        <div className="flex flex-col gap-1">
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
              <span>{getJobLevelMN(mockEmployeeData.employeeJobLevel)}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-muted-foreground">Төрөл:</p>
            <p className="font-medium">
              <span>{getJobTypeMN(mockEmployeeData.employeeJobType)}</span>
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-muted-foreground">Утас:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeTelNumber}</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">И-мэйл хаяг:</p>
            <p className="font-medium">
              <span>{mockEmployeeData.employeeEmail}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { Card, CardContent } from '@intern-3a/shadcn';
import { HrPostedJobsType } from 'apps/referu-employee-fe/src/libs/utils/type';
import React from 'react';

export const JobCardDetailPartInfo = ({ selectedJob }: { selectedJob: HrPostedJobsType }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Холбоо барих</h3>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-[#005295]">•</span>
            <span className="text-muted-foreground">{selectedJob.contactInfo}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Байршил</h3>
          <div className="flex gap-2 text-sm items-center">
            <span className="text-[#005295]">•</span>
            <span className="text-muted-foreground">{selectedJob.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

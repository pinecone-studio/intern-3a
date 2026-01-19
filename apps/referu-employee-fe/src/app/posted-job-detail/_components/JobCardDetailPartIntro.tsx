import { Badge, Card, CardContent } from '@intern-3a/shadcn';
import { formatDate } from 'apps/referu-employee-fe/src/libs/utils/get-date';
import { HrPostedJobsType } from 'apps/referu-employee-fe/src/libs/utils/type';
import React from 'react';

export const JobCardDetailPartIntro = ({ selectedJob }: { selectedJob: HrPostedJobsType }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div>
          <div className="flex gap-3 items-center">
            <div className="text-lg font-bold">{selectedJob.jobTitle}</div>
            <p className="text-sm text-muted-foreground">{selectedJob.jobDepartment} хэлтэс</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-base text-[#005295] font-semibold">
            <span>₮{selectedJob.salaryMin?.toLocaleString()}</span> - <span>₮{selectedJob.salaryMax?.toLocaleString()}</span>
          </div>
          <Badge variant={'secondary'} className="text-xs hover:text-white bg-[#005295]/10 hover:bg-[#005295] transition-all duration-300 cursor-pointer">
            <span>Төрөл: </span>
            {selectedJob.jobType}
          </Badge>
          <Badge variant={'secondary'} className="text-xs hover:text-white bg-[#005295]/10 hover:bg-[#005295] transition-all duration-300 cursor-pointer">
            <span>Түвшин:</span>
            {selectedJob.jobLevel}
          </Badge>
          <Badge variant={'secondary'} className="text-xs font-normal hover:text-white hover:bg-black transition-all duration-300 cursor-pointer">
            <span>Нийтэлсэн огноо: </span>
            {formatDate(selectedJob.createdAt)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

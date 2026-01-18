import { Badge, Card, CardContent } from '@intern-3a/shadcn';
import { formatDate } from 'apps/referu-employee-fe/src/libs/utils/get-date';
import { HrPostedJobsType } from 'apps/referu-employee-fe/src/libs/utils/type';
import React from 'react';

export const JobCardDetailPartIntro = ({ selectedJob }: { selectedJob: HrPostedJobsType }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="text-lg font-bold">{selectedJob.jobTitle}</div>
        <div className="flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">{selectedJob.jobDepartment} хэлтэс</div>

          <div className="flex gap-3">
            <Badge variant={'secondary'} className="text-xs hover:text-white bg-[#005295]/10 hover:bg-[#005295] transition-all delay-300s cursor-pointer">
              <span>Түвшин:</span>
              {selectedJob.jobLevel}
            </Badge>
            <Badge variant={'secondary'} className="text-xs hover:text-white bg-[#005295]/10 hover:bg-[#005295] transition-all delay-300s cursor-pointer">
              <span>Төрөл: </span>
              {selectedJob.jobType}
            </Badge>
          </div>

          <div className="text-base text-[#005295] font-semibold">
            <span>₮{selectedJob.salaryMin?.toLocaleString()}</span> - <span>₮{selectedJob.salaryMax?.toLocaleString()}</span>
          </div>

          <div className="text-xs font-normal">
            <span>Нийтэлсэн огноо: </span>
            {formatDate(selectedJob.createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

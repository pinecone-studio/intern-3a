import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@intern-3a/shadcn';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HrPostedJobsType } from '../../libs/type';
import { formatDate } from '../../libs/utils/get-date';

export const PostedJobCard = ({ job }: { job: HrPostedJobsType }) => {
  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/posted-job-detail/${job._id}`)} className="transition-all duration-300 cursor-pointer hover:shadow-md active:scale-[0.98] border-border/50 gap-1.5 flex">
      <div className="flex justify-between">
        <CardHeader className="flex-1">
          <CardTitle className="">{job.jobTitle}</CardTitle>
          <CardDescription>{job.jobDepartment} хэлтэс</CardDescription>
        </CardHeader>
        <ChevronRight size={20} className="text-muted-foreground mr-6" />
      </div>

      <CardContent className="flex flex-col gap-3">
        <div className="text-[#005295] text-sm font-medium">
          <span>₮{job.salaryMin?.toLocaleString()}</span> - <span>₮{job.salaryMax?.toLocaleString()}</span>
        </div>

        <Badge variant={'secondary'} className="font-normal hover:text-white hover:bg-black transition-all duration-300">
          {formatDate(job.createdAt)}
        </Badge>
      </CardContent>
    </Card>
  );
};

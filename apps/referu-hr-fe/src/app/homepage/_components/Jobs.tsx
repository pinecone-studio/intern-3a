import { hrPostedJobs } from '@/lib/utils/get-data';
import { Badge, Card } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Jobs = () => {
  const router = useRouter();

  const handleJobClick = (jobId: string) => {
    router.push(`/job/${jobId}`);
  };
  return (
    <div>
      <div className="p-4 space-y-3">
        {hrPostedJobs.map((job) => (
          <Card key={job._id} className="p-4 space-y-2 cursor-pointer hover:shadow-md transition-shadow bg-white rounded-lg" onClick={() => handleJobClick(job._id)}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900">{job.jobTitle}</h3>
              {/* {job.referralCount && job.referralCount > 0 && (
                <Badge variant="secondary" className="shrink-0">
                  {job.referralCount}
                </Badge>
              )} */}
            </div>
            <p className="text-sm text-gray-600">{job.jobDepartment}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600 font-medium">
                ₮{job.salaryMin.toLocaleString()} - ₮{job.salaryMax.toLocaleString()}
              </span>
              <span className="text-gray-500">{job.createdAt}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

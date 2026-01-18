'use client';

import { hrPostedJobs } from 'apps/referu-employee-fe/src/libs/utils/get-datas';
import { use } from 'react';
import { PostedJobCard } from '../../_components';
import { JobCardDetailFooterNav, JobCardDetailHeading, JobCardDetailPartIntro, JobCardDetailPartMain } from '../_components';

export default function PostedJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const selectedJob = hrPostedJobs.find((job) => job._id === id);
  console.log({ selectedJob });

  if (!selectedJob) {
    return <div className="flex justify-center items-center">Сонгосон ажлын зар олдсонгүй.</div>;
  }

  return (
    <div className="w-full h-full flex flex-col pb-20">
      <JobCardDetailHeading />

      <div className="p-5 flex flex-col gap-3">
        {selectedJob && <PostedJobCard job={selectedJob} key={selectedJob._id} />}
        <JobCardDetailPartIntro />
        <JobCardDetailPartMain />
      </div>

      <JobCardDetailFooterNav selectedJob={selectedJob} />
    </div>
  );
}

'use client';

import { mockJobData } from '@/lib/get-data';
import { JobDetail } from '@/lib/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bottom } from './_components/Bottom';
import { Content } from './_components/Content';
import { Header } from './_components/Header';

export default function JobDetailPage() {
  const params = useParams();
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);

  useEffect(() => {
    const jobId = params.id as string;
    const job = mockJobData[jobId];
    if (job) setJobDetail(job);
  }, [params.id]);

  if (!jobDetail) {
    return <div className="p-4">Ачааллаж байна...</div>;
  }

  return (
    <div>
      <Header />
      <Content jobDetail={jobDetail} />
      <Bottom jobDetail={jobDetail} />
    </div>
  );
}

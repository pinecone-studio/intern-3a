'use client';

import { Button } from '@intern-3a/shadcn';
import { HrPostedJobsType } from 'apps/referu-employee-fe/src/libs/utils/type';
import { useRouter } from 'next/navigation';
import React from 'react';

export const JobCardDetailFooterNav = ({ selectedJob }: { selectedJob: HrPostedJobsType }) => {
  const router = useRouter();
  return (
    <div className="h-18 fixed bottom-0 left-0 right-0 flex items-center gap-3 bg-card border-t border-border/50 shadow-lg z-50 px-5">
      <Button onClick={() => router.back()} variant={'outline'} className="flex-1 cursor-pointer">
        Буцах
      </Button>
      <Button onClick={() => router.push(`/refer-person/${selectedJob._id}`)} className="bg-[#005295] hover:bg-[#005295]/90 flex-1 cursor-pointer">
        Санал болгох
      </Button>
    </div>
  );
};

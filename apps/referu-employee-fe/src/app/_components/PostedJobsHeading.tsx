import React from 'react';
import { LuBuilding2 } from 'react-icons/lu';
import { HrPostedJobsType } from '../../libs/utils/type';

export const PostedJobsHeading = ({ hrPostedJobs }: { hrPostedJobs: HrPostedJobsType[] }) => {
  return (
    <div className="bg-card px-5 py-8 border-b border-border/50 sticky top-0 z-10 shadow-md flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#005295]/10 flex items-center justify-center">
        <LuBuilding2 size={20} className="text-[#005295]" />
      </div>

      <div>
        <p className="text-lg font-semibold">Ажлын Санал</p>
        <p className="text-xs text-muted-foreground">
          {hrPostedJobs.length} <span>нээлттэй ажлын байр</span>
        </p>
      </div>
    </div>
  );
};

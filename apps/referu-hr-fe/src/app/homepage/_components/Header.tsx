// import { mockJobs } from '@/lib/get-data';
import { LuBuilding2 } from 'react-icons/lu';

import { hrPostedJobs } from '@/lib/utils/get-data';
import React from 'react';

export const Header = () => {
  return (
    // <div>
    //   <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
    //     <div className="p-4">
    //       <p className="text-xs text-gray-600">Ажилтны санал- Employee Referral</p>
    //       <h1 className="text-xl font-bold text-gray-900">Ажлын санал</h1>
    //     </div>
    //   </header>

    //   <div className="p-4 bg-white border-b border-gray-200">
    //     <p className="text-2xl font-bold text-gray-900">
    //       {mockJobs.length}
    //       <span className="text-sm font-normal text-gray-600 ml-2">нээлттэй ажлын байр</span>
    //     </p>
    //   </div>
    // </div>
    <div className="bg-card px-5 py-8 border-b border-border/50 sticky top-0 z-10 shadow-md flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#005295]/10 hover:bg-[#005295]/5 transition-all delay-300 flex items-center justify-center cursor-pointer">
        <LuBuilding2 size={20} className="text-[#005295]" />
      </div>

      <div>
        <p className="text-lg font-semibold">Ажлын санал</p>
        <p className="text-xs text-muted-foreground">
          {hrPostedJobs.length} <span>нээлттэй ажлын байр</span>
        </p>
      </div>
    </div>
  );
};

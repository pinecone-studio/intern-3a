import { mockJobs } from '@/lib/get-data';
import React from 'react';

export const Header = () => {
  return (
    <div>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="p-4">
          <p className="text-xs text-gray-600">Ажилтны санал- Employee Referral</p>
          <h1 className="text-xl font-bold text-gray-900">Ажлын санал</h1>
        </div>
      </header>

      <div className="p-4 bg-white border-b border-gray-200">
        <p className="text-2xl font-bold text-gray-900">
          {mockJobs.length}
          <span className="text-sm font-normal text-gray-600 ml-2">нээлттэй ажлын байр</span>
        </p>
      </div>
    </div>
  );
};

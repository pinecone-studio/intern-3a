'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const JobCardDetailHeading = () => {
  const router = useRouter();
  return (
    <div className="bg-card px-5 py-8 border-b border-border/50 sticky top-0 z-10 shadow-md flex items-center gap-3">
      <div onClick={() => router.back()} className="w-9 h-9 rounded-lg hover:bg-[#005295]/10 flex items-center justify-center cursor-pointer">
        <ArrowLeft size={20} />
      </div>
      <p className="text-lg font-semibold">Ажлын дэлгэрэнгүй</p>
    </div>
  );
};

'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Header = () => {
  const router = useRouter();

  return (
    <div className="flex items-center px-4 bg-white  border-b w-full border-border">
      <div onClick={() => router.back()} className="w-9 h-9 rounded-lg hover:bg-[#005295]/10 transition-all duration-300 flex items-center justify-center cursor-pointer">
        <ArrowLeft size={20} />
      </div>
      <h1 className="px-4 py-3 text-lg font-semibold tracking-tight">Миний хэсэг</h1>
    </div>
  );
};

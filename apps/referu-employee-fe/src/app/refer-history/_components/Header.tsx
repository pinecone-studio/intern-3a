'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Header = () => {
  const router = useRouter();
  return (
    <div className="bg-card border-b border h-13 shadow-sm flex items-center">
      <div className="pl-2 flex items-center gap-2">
        <ArrowLeft onClick={() => router.back()} className="w-5 h-5  text-muted-foreground" />
        <h1 className="text-lg  font-semibold">Санал болгосон түүх</h1>
      </div>
    </div>
  );
};

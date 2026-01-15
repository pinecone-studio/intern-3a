'use client';

import { mockJobs } from '@/lib/get-data';
import { Button, cn } from '@intern-3a/shadcn';
import { Bell, Home, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Footer = () => {
  const totalReferrals = mockJobs.reduce((sum, job) => sum + (job.referralCount || 0), 0);
  const router = useRouter();
  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around p-2">
          <Button variant="ghost" className={cn('flex flex-col items-center gap-1 h-auto py-2 px-6')}>
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Нүүр</span>
          </Button>

          <Button variant="ghost" className={cn('flex flex-col items-center gap-1 h-auto py-2 px-6')}>
            <Plus className="w-6 h-6" />
            <span className="text-xs font-medium">Нэмэх</span>
          </Button>

          <Button variant="ghost" className={cn('flex flex-col items-center gap-1 h-auto py-2 px-6 relative')} onClick={() => router.push('/hr-myPage')}>
            <div className="relative">
              <Bell className="w-6 h-6" />
              {totalReferrals > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">{totalReferrals}</span>
              )}
            </div>
            <span className="text-xs font-medium">Миний</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

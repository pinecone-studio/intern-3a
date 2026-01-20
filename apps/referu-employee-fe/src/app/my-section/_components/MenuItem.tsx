'use client';
import { Card, CardContent } from '@intern-3a/shadcn';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const MenuItem = () => {
  const router = useRouter();
  return (
    <Card onClick={() => router.push('/refer-history')} className="border-none">
      <CardContent>
        <button className=" w-full flex items-center justify-between hover:bg-accent transition-colors">
          <span className="font-medium">Санал болгосон түүх</span>
          <ChevronRight className="w-6 h-6 text-muted-foreground" />
        </button>
      </CardContent>
    </Card>
  );
};

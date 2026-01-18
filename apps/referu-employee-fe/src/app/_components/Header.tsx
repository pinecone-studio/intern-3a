'use client';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Header = () => {
  const router = useRouter();
  return (
    <div className="h-16 bg-[#005295] flex items-center px-5 justify-between">
      <p onClick={() => router.push('/')} className="text-lg font-bold text-white cursor-pointer">
        Refer<span className="text-slate-400">U</span>
      </p>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </div>
  );
};

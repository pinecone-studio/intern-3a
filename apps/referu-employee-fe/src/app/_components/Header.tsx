'use client';
import { SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';

export const Header = () => {
  return (
    <div className="h-16 bg-[#005295] flex items-center px-5">
      <p className="text-lg font-semibold">ReferU</p>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
    </div>
  );
};

'use client';

import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export const ClerkHeader = () => {
  return (
    <header className="flex justify-between items-center w-full h-14 shadow-sm bg-amber-200">
      <Link href="/">
        <h1 className="text-xl font-semibold">You are signed in, Go to main</h1>
      </Link>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

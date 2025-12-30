'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import React from 'react';

export const MyUserButton = () => {
  return (
    <div className="flex items-center">
      <SignedOut>
        <div className="flex gap-5">
          <SignInButton>
            <Button className="rounded-full cursor-pointer bg-[#FCB027] hover:bg-[#f5a81d]">Нэвтрэх</Button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

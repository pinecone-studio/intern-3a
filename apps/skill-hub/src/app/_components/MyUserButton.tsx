'use client';

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { Layers2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const MyUserButton = () => {
  const { user } = useUser();
  const router = useRouter();
  const role = user?.publicMetadata?.role;
  console.log({ user });

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
        <UserButton>
          <UserButton.MenuItems>{role !== 'GENERAL' && <UserButton.Action label="Миний хуудас" labelIcon={<Layers2 />} onClick={() => router.push('/user-profile')} />}</UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </div>
  );
};

'use client';

import { useUser } from '@clerk/nextjs';
import { Button, Dialog, DialogTrigger } from '@intern-3a/shadcn';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CategoryDropdown } from './CategoryDropdown';
import { ClubRegisterBtnDialogContent } from './ClubRegisterBtnDialogContent';
import { MyUserButton } from './MyUserButton';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <div className="w-full h-20 bg-[#0A427A] sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-10">
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-2 sm:gap-5">
        <Image className="text-white font-bold text-xl" width={40} height={40} src="/logo.png" alt="Logo" />
        <Link href={'/'}>
          <span
            className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider
                         text-transparent bg-clip-text bg-linear-to-r
                         from-pink-500 via-red-500 to-yellow-400
                         animate-pulse hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
          >
            Growly
          </span>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="hidden sm:block">
          <CategoryDropdown />
        </div>
        <div className="hidden sm:block">
          <SearchBar />
        </div>
      </div>

      <div className="flex gap-2 sm:gap-5 items-center pl-4">
        {role === 'ADMIN' && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#FCB027] hover:bg-[#f5a81d] rounded-full cursor-pointer">Дугуйлан Бүртгүүлэх</Button>
            </DialogTrigger>
            <ClubRegisterBtnDialogContent setOpen={setOpen} />
          </Dialog>
        )}

        <MyUserButton />
      </div>
    </div>
  );
};

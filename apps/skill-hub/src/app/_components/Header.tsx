'use client';
import { Button, Dialog, DialogTrigger } from '@intern-3a/shadcn';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ClubRegisterBtnDialogContent } from './ClubRegisterBtnDialogContent';
import { MyUserButton } from './MyUserButton';

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-20 bg-blue-950 sticky top-0 z-50 flex justify-between items-center px-10">
      <div className="flex items-center h-full gap-4">
        <Image className="text-white font-bold text-xl" width={40} height={40} src="/logo.png" alt="Logo" />
        <Link href={'/'}>
          <span
            className="text-2xl font-extrabold uppercase tracking-wider 
                         text-transparent bg-clip-text bg-linear-to-r 
                         from-pink-500 via-red-500 to-yellow-400
                         animate-pulse hover:scale-110 transition-transform duration-300 hover:cursor-pointer"
          >
            Growly
          </span>
        </Link>
      </div>

      <div className="flex gap-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 rounded-full cursor-pointer">Дугуйлан Бүртгүүлэх</Button>
          </DialogTrigger>
          <ClubRegisterBtnDialogContent setOpen={setOpen} />
        </Dialog>

        <MyUserButton />
      </div>
    </div>
  );
};

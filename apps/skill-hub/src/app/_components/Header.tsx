'use client';

import { Button, Dialog, DialogTrigger } from '@intern-3a/shadcn';
import React, { useState } from 'react';
import { ClubRegisterBtnDialogContent } from './ClubRegisterBtnDialogContent';
import { MyUserButton } from './MyUserButton';

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-20 bg-blue-950 flex justify-between px-10 items-center">
      <div className="flex items-center">
        <img className="text-white font-bold text-xl w-20 h-20 rounded-full" src="/logo.png" alt="Logo" />
        <span
          className="text-2xl font-extrabold uppercase tracking-wider 
                         text-transparent bg-clip-text bg-linear-to-r 
                         from-pink-500 via-red-500 to-yellow-400
                         animate-pulse hover:scale-110 transition-transform duration-300"
        >
          Growly
        </span>
      </div>

      <Button variant="destructive">Hello</Button>

      <div className="flex gap-5 items-center">
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

'use client';

import { SignInButton } from '@clerk/nextjs';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, Button } from '@intern-3a/shadcn';
import React, { Dispatch, SetStateAction } from 'react';

export const RegisterLoginAlertDialog = ({ showLoginAlert, setShowLoginAlert, id }: { showLoginAlert: boolean; setShowLoginAlert: Dispatch<SetStateAction<boolean>>; id: string }) => {
  return (
    <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
      <AlertDialogContent className="w-fit gap-10">
        <AlertDialogHeader className="gap-0">
          <AlertDialogTitle>Та нэвтэрч орох уу?</AlertDialogTitle>
          <AlertDialogDescription>Дугуйланд бүртгүүлэхийн тулд эхлээд нэвтрэх шаардлагатай.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-between">
          <Button variant={'outline'} onClick={() => setShowLoginAlert(false)} className="cursor-pointer">
            Буцах
          </Button>
          <SignInButton>
            <Button className="bg-orange-600 cursor-pointer">Нэвтрэх</Button>
          </SignInButton>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

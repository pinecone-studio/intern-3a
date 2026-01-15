'use client';

import { Button, Tabs, TabsList, TabsTrigger } from '@intern-3a/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReferralJobList from './_components/ReferralJobList';
import ResolvedReferrals from './_components/ResolvedReferrals';

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 justify-center w-full p-7">
      <div className="flex gap-4 items-center">
        <Button variant={'ghost'} onClick={() => router.push('/homepage')}>
          <ArrowLeft className="w-4" />
        </Button>
        <p className="text-md font-semibold">Миний</p>
      </div>
      <Tabs defaultValue="account" className="gap-0">
        <TabsList className="w-full mb-7">
          <TabsTrigger value="account">Ирсэн саналууд</TabsTrigger>
          <TabsTrigger value="password">Шийдвэрлэгдсэн</TabsTrigger>
        </TabsList>
        <ReferralJobList />
        <ResolvedReferrals />
      </Tabs>
    </div>
  );
};

export default Page;

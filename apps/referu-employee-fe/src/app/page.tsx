'use client';
import { Badge, Button } from '@intern-3a/shadcn';
import { House, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Footer, Header } from './_components';

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Badge></Badge>
      <div className="flex items-center justify-around">
        <Button variant={'ghost'} className="flex-col h-fit text-[#6d7277] hover:text-[#005295]  gap-0">
          <House />
          <span>Нүүр</span>
        </Button>
        <Button variant={'ghost'} onClick={() => router.push('/my-section')} className="flex-col h-fit text-[#6d7277] hover:text-[#005295]  gap-0">
          <User />
          <span>Миний</span>
        </Button>
      </div>
      {/* <Button onClick={() => router.push('/my-section')}>Миний</Button> */}
      <Footer />
    </div>
  );
};

export default HomePage;

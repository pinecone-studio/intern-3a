'use client';
import { Badge, Button } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-red-100">
      <Badge></Badge>
      <Button onClick={() => router.push('/my-section')}>Миний</Button>
      {/* <Button onClick={() => router.push('/my-section')}>Миний</Button> */}
    </div>
  );
};

export default HomePage;

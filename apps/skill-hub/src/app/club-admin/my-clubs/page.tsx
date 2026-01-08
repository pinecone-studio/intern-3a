'use client';

import { AdminMyClubsComponent } from '@/app/_components/adminPage';
import React from 'react';

const Page = () => {
  return (
    <div className="p-10 flex flex-col gap-8 max-w-480">
      <AdminMyClubsComponent />
    </div>
  );
};

export default Page;

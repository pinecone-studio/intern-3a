'use client';

import { AdminMyClubsComponent } from '@/app/_components/adminPage';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <div className="p-10 flex flex-col gap-8 max-w-480">
      <Suspense fallback={<div>Loading...</div>}>
        <AdminMyClubsComponent />
      </Suspense>
    </div>
  );
};

export default page;

'use client';

import dynamicImport from 'next/dynamic';
import React from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const AdminMyClubsComponent = dynamicImport(() => import('@/app/_components/adminPage').then((mod) => ({ default: mod.AdminMyClubsComponent })), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const Page = () => {
  return (
    <div className="p-10 flex flex-col gap-8 max-w-480">
      <AdminMyClubsComponent />
    </div>
  );
};

export default Page;

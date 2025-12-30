'use client';

import { useUser } from '@clerk/nextjs';

const Page = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Таны хувийн календарь {user?.lastName}</h1>

      {/* <TeamCalendar /> */}
    </div>
  );
};

export default Page;

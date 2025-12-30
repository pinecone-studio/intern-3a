import AdminMyClubsComponent from '@/app/_components/adminPage/AdminMyClubsComponent';
import React from 'react';

const page = () => {
  return (
    <div className="p-10 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold leading-6">Миний үүсгэсэн дугуйлангууд</h2>
      <AdminMyClubsComponent />
    </div>
  );
};

export default page;

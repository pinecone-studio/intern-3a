'use client';

import { useCreatedClubs } from '@/app/hook/use-created-club';
import { Badge, Card } from '@intern-3a/shadcn';
import React from 'react';

const AdminMyClubsComponent = () => {
  const { myCreatedClubs } = useCreatedClubs();

  // const levelLabel = useMemo(() => myCreatedClubs.selectedClassLevelNames?.map((l) => CLASS_LEVEL_LABEL_MN[l]).join(' · ') || '—', [club.selectedClassLevelNames]);

  return (
    <div className="flex flex-col gap-10 flex-wrap ">
      {myCreatedClubs.map((club) => (
        <Card key={club._id} className="group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl min-w-250 p-0 bg-[#f5f5f5]">
          <div className="py-5 px-2 flex gap-10">
            <img src={club.clubImage as string} alt={club.clubName} className="w-50 h-56 rounded-md object-cover" />
            <div className=" flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-[#0A427A]">{club.clubName}</div>
                <div>
                  <Badge className="bg-[#FCB027] font-bold">{club.clubCategoryName}</Badge>
                </div>
              </div>
              <div>{club.clubSubCategoryName}</div>
              <div>{club.clubDescription}</div>
              <div>{club.clubAddress}</div>

              {/* <div>{club.scheduledClubTimes}</div>
              <div>{club.clubPrices}</div> */}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminMyClubsComponent;

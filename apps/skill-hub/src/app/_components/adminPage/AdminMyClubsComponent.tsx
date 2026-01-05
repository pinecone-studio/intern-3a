'use client';

import { useCreatedClubs } from '@/app/hook/use-created-club';
import { useSearchParams } from 'next/navigation';

const AdminMyClubsComponent = () => {
  const searchParams = useSearchParams();
  const clubId = searchParams.get('id');

  const { myCreatedClubs } = useCreatedClubs();

  const selectedClub = myCreatedClubs?.find((club) => club._id === clubId);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8">
        {selectedClub && (
          <div className="flex gap-10">
            <div className="w-100 h-100 rounded-lg overflow-hidden">
              <img src={typeof selectedClub.clubImage === 'string' ? selectedClub.clubImage : ''} alt={selectedClub.clubName} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#FCB027]">{selectedClub.clubName}</h1>
              {/* <p>{selectedClub.clubPrices?.[level]?.toLocaleString()}</p> */}
              <p>{selectedClub.clubCategoryName}</p>
              <p>{selectedClub.clubSubCategoryName}</p>
              {/* <p>{selectedClub.scheduledClubTimes}</p> */}
              <p>{selectedClub.selectedClassLevelNames}</p>
              {/* <p>{selectedClub.teachersInfoByClass}</p> */}

              <p>Хаяг: {selectedClub.clubAddress}</p>
              <p>{selectedClub.clubDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMyClubsComponent;

'use client';

import { getClassLevelMN, NewClubType } from '@/lib/utils/types';
import { Badge, Button, Spinner } from '@intern-3a/shadcn';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterLoginAlertDialog } from '../club/_components';

export const AllClubsCardScrollAnimation = ({ allClubs, isLoading }: { allClubs: NewClubType[]; isLoading: boolean }) => {
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-20 gap-5 py-12">
        <p className="text-gray-400 font-semibold text-xl">Уншиж байна</p>
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!allClubs.length) {
    return <p className="text-center text-gray-400 font-semibold text-xl py-12">Клуб олдсонгүй</p>;
  }

  return (
    <div className="relative w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-12">
      <div className="flex gap-4 px-6 w-max animate-scroll relative z-10">
        {[...allClubs, ...allClubs].map((club, index) => (
          <div key={`${club._id}-${index}`} className="w-80 h-45 shrink-0 border-2 border-slate-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-400">
            <div className="flex justify-between items-center mb-4">
              <h4 onClick={() => router.push(`/club/${club._id}`)} className="text-xl font-bold text-black hover:text-[#0A427A] truncate cursor-pointer">
                {club.clubName}
              </h4>
              <div className="flex gap-1">
                {club.selectedClassLevelNames?.map((level) => (
                  <Badge key={level} className="bg-orange-50 text-orange-600 hover:text-orange-700 cursor-pointer">
                    {getClassLevelMN(level)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <MapPin size={14} className="text-orange-500 hover:text-orange-700 shrink-0 cursor-pointer" />
              <p className="truncate">{club.clubAddress}</p>
            </div>

            <Button onClick={() => router.push(`/club/${club._id}`)} className="w-full bg-[#0A427A] hover:bg-black text-white rounded-full px-5 cursor-pointer transition-all duration-400">
              Дэлгэрэнгүй
            </Button>

            <RegisterLoginAlertDialog showLoginAlert={showLoginAlert} setShowLoginAlert={setShowLoginAlert} id={club._id!} message="" />
          </div>
        ))}
      </div>
    </div>
  );
};

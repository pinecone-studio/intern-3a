'use client';

import { Badge, Button, Spinner } from '@intern-3a/shadcn';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClub } from '../hook/use-club';

export const AllClubsCardScrollAnimation = () => {
  const { allClubs, isLoading } = useClub();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-20 mt-20 gap-5">
        <p className="text-gray-400 font-semibold text-xl">Уншиж байна</p>
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (!allClubs.length) {
    return <p className="text-center text-gray-400 mt-20 font-semibold text-xl">Клуб олдсонгүй</p>;
  }

  return (
    <div
      className=" w-full overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden
       [-ms-overflow-style:none]
      [scrollbar-width:none] "
    >
      <div className="flex gap-4 px-6 w-max animate-scroll p-20">
        {[...allClubs, ...allClubs].map((club, index) => (
          <div key={`${club._id}-${index}`} className="w-80 h-45 shrink-0 border-2 border-slate-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-slate-900 truncate">{club.clubName}</h4>
              <div className="flex gap-2">
                {club.selectedClassLevelNames?.map((level) => (
                  <Badge key={level} className="bg-[#FCB027]">
                    {level}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <MapPin className="w-4 h-4 text-[#FCB027]" />
              <span className="truncate">{club.clubAddress}</span>
            </div>

            <div className="flex justify-between mt-auto">
              <Link href={`/club/${club._id}`}>
                <Button className="bg-[#FCB027] hover:bg-[#e69f1c] text-white rounded-full px-5">Дэлгэрэнгүй</Button>
              </Link>

              <Button className="bg-[#0A427A] hover:bg-[#093662] text-white rounded-full px-5" onClick={() => router.push('/register')}>
                Бүртгүүлэх
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

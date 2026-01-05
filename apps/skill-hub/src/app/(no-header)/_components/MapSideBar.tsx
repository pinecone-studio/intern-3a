'use client';

import { ClassLevelsType, getClassLevelMN, NewClubType } from '@/lib/utils/types';
import { Badge } from '@intern-3a/shadcn';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type MapSideBarProps = {
  visibleClubs: NewClubType[];
  sidebarOpen: boolean;
  onToggle: () => void;
  hoveredClubId: string | null;
  setHoveredClubId: (id: string | null) => void;
};
export default function MapSideBar({ visibleClubs, sidebarOpen, onToggle, hoveredClubId, setHoveredClubId }: MapSideBarProps) {
  const router = useRouter();
  const [hoveredAddress, setHoveredAddress] = useState<string | null>(null);
  const [hoveredPrice, setHoveredPrice] = useState<{ clubId: string; level: ClassLevelsType } | null>(null);

  return (
    <div className={`fixed left-0 top-0 h-screen bg-white/5 z-20 transition-all duration-300 ${sidebarOpen ? 'w-85' : 'w-0 overflow-hidden'}`}>
      <div className="p-3 border-b flex justify-between items-center">
        <strong>{visibleClubs.length} дугуйлан</strong>
        <button onClick={onToggle} className="text-lg font-bold">
          {sidebarOpen ? '←' : '☰'}
        </button>
      </div>

      <div className="overflow-y-auto overflow-visible h-full flex flex-col gap-1 py-1 px-3">
        {visibleClubs.map((club) => {
          const imageSrc = typeof club.clubImage === 'string' ? club.clubImage : '/placeholder.jpg';

          return (
            <div
              key={club._id}
              onMouseEnter={() => club._id && setHoveredClubId(club._id)}
              onMouseLeave={() => setHoveredClubId(null)}
              className={`p-3 border-b transition-all duration-200 flex flex-col gap-2 ${hoveredClubId === club._id ? 'bg-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] scale-101' : 'bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'}`}
            >
              <img onClick={() => router.push(`/club/${club._id}`)} src={imageSrc} className="w-full h-32 aspect-\[16/9]\ object-cover rounded-md cursor-pointer" />
              <div className="flex justify-between items-center">
                <p onClick={() => router.push(`/club/${club._id}`)} className="text-[#083563] hover:text-black font-bold cursor-pointer">
                  {club.clubName}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {club?.selectedClassLevelNames?.map((level: ClassLevelsType) => (
                    <div key={level} onMouseEnter={() => club._id && setHoveredPrice({ clubId: club._id, level })} onMouseLeave={() => setHoveredPrice(null)} className="relative">
                      <Badge variant={'secondary'} className="text-xs bg-orange-50 font-bold text-orange-600 hover:text-orange-700 cursor-pointer">
                        {getClassLevelMN(level)} анги
                      </Badge>

                      {hoveredPrice?.clubId === club._id && hoveredPrice?.level === level && (
                        <div className="absolute bottom-6 left-1 bg-black text-white rounded-full px-4 py-2 z-50">
                          <p className="text-xs">{club?.clubPrices?.[level as keyof typeof club.clubPrices] ?? 0}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <MapPin
                    size={16}
                    className="text-[#083563] fill-white hover:text-black cursor-pointer"
                    onMouseEnter={() => club._id && setHoveredAddress(club._id)}
                    onMouseLeave={() => setHoveredAddress(null)}
                  />

                  {hoveredAddress === club._id && (
                    <div className="absolute bottom-9 left-1 bg-black text-white rounded-full px-4 py-2 z-50">
                      <p className="text-xs">{club.clubAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

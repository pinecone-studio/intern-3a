'use client';

import { NewClubType } from '@/lib/utils/types';
import React from 'react';

type MapSideBarProps = {
  visibleClubs: NewClubType[];
  sidebarOpen: boolean;
  onToggle: () => void;
  hoveredClubId: string | null;
  setHoveredClubId: (id: string | null) => void;
};
export default function MapSideBar({ visibleClubs, sidebarOpen, onToggle, hoveredClubId, setHoveredClubId }: MapSideBarProps) {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white z-20 transition-all duration-300 ${sidebarOpen ? 'w-95' : 'w-0 overflow-hidden'}`}>
      <div className="p-4 border-b flex justify-between items-center">
        <strong>{visibleClubs.length} дугуйлан</strong>
        <button onClick={onToggle} className="text-lg font-bold">
          {sidebarOpen ? '←' : '☰'}
        </button>
      </div>

      <div>
        {visibleClubs.map((club) => {
          const imageSrc = typeof club.clubImage === 'string' ? club.clubImage : '/placeholder.jpg';

          return (
            <div
              key={club._id}
              onMouseEnter={() => club._id && setHoveredClubId(club._id)}
              onMouseLeave={() => setHoveredClubId(null)}
              className={`p-3 border-b cursor-pointer transition ${hoveredClubId === club._id ? 'bg-orange-50' : ''}`}
            >
              <img src={imageSrc} className="w-full h-28 object-cover rounded-md mb-2"></img>
              <strong>{club.clubName}</strong>
              <p className="text-ts text-slate-500">{club.clubAddress}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

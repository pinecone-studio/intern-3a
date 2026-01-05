'use client';

import { useClub } from '@/app/hook/use-club';
import React from 'react';
import { BookingStyleMap } from '../_components';

const MapPage = () => {
  const { allClubs } = useClub();

  return (
    <div className="w-full h-screen">
      <BookingStyleMap allClubs={allClubs} />
    </div>
  );
};
export default MapPage;

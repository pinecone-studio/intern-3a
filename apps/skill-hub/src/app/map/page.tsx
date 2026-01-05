'use client';

import React from 'react';
import { useClub } from '../hook/use-club';
import { BookingStyleMap } from './_components';

const MapPage = () => {
  const { allClubs } = useClub();

  return (
    <div>
      <BookingStyleMap allClubs={allClubs} />
    </div>
  );
};
export default MapPage;

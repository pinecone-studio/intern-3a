'use client';

import { useClub } from '@/app/hook/use-club';
import React, { useEffect, useState } from 'react';
import { BookingStyleMap } from '../_components';

const MapPage = () => {
  const { allClubs, isLoading } = useClub();
  const [userLocation, setUserLoaction] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoaction([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setUserLoaction([47.9189, 106.9175]);
      },
    );
  }, []);

  if (!userLocation) return <div className="w-full h-screen grid place-items-center">Газрын зураг ачааллаж байна</div>;

  return (
    <div className="w-full h-screen">
      <BookingStyleMap allClubs={allClubs} userLocation={userLocation} isLoading={isLoading} />
    </div>
  );
};
export default MapPage;

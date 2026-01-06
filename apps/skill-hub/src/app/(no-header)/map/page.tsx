'use client';

import { useClub } from '@/app/hook/use-club';
import React, { useEffect, useState } from 'react';
import { BookingStyleMap } from '../_components';

const MapPage = () => {
  const { allClubs } = useClub();
  const [userLocation, setUserLoaction] = useState<[number, number] | null>(null);
  console.log({ userLocation });

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

  if (!userLocation) return <div className="w-full h-screen grid place-items-center">Ачааллаж байна</div>;

  return (
    <div className="w-full h-screen">
      <BookingStyleMap allClubs={allClubs} userLocation={userLocation} />
    </div>
  );
};
export default MapPage;

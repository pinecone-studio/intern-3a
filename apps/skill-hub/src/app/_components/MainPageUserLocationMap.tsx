'use client';

import { NewClubType } from '@/lib/utils/types';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const UserMapContent = dynamic(() => import('./UserMapContent'), { ssr: false });

export const MainPageUserLocationMap = ({ allClubs, isLoading }: { allClubs: NewClubType[]; isLoading: boolean }) => {
  const [userLocation, setUserLocation] = useState<[number, number]>();
  const RADIUS_STEPS = [0.5, 1, 2, 3, 10];
  const [selectedRadius, setSelectedRadius] = useState<number>(0.5);

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation([47.9189, 106.9175]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        setUserLocation([47.9189, 106.9175]);
      },
    );
  }, []);

  if (!userLocation) {
    return <div className="w-full h-[400px] flex justify-center items-center">Газрын зураг ачааллаж байна…</div>;
  }

  return (
    <div className="w-full h-[400px] overflow-hidden">
      <MapContainer center={userLocation} zoom={13} scrollWheelZoom className="w-full h-full">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={userLocation}>
          <Popup>Таны байршил</Popup>
        </Marker>

        {!isLoading &&
          allClubs?.length > 0 &&
          allClubs.map((club) => (
            <Marker key={club._id} position={[club.clubLat, club.clubLong]}>
              <Popup>{club.clubName}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

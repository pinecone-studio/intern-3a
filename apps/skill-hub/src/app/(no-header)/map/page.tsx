'use client';

import { useClub } from '@/app/hook/use-club';
import React, { useEffect, useState } from 'react';
import { BookingStyleMap } from '../_components';

const MapPage = () => {
  const { allClubs, isLoading } = useClub();
  const [userLocation, setUserLoaction] = useState<[number, number] | null>(null);
  const [locationInput, setLocationInput] = useState('');
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLoaction(loc);
        setCurrentLocation(loc);
      },
      () => {
        const fallback: [number, number] = [47.9189, 106.9175];
        setUserLoaction(fallback);
        setCurrentLocation(fallback);
      },
    );
  }, []);

  const handleLocationSearch = async () => {
    if (!locationInput) return;

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`);
    const data = await res.json();

    if (data?.length) {
      setUserLoaction([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    }
  };

  if (!userLocation) return <div className="w-full h-screen grid place-items-center">Газрын зураг ачааллаж байна</div>;

  return (
    <div className="realtive w-full h-screen">
      <div className="absolute top-2 right-12 z-10000 bg-white rounded-xl shadow-lg p-3 flex gap-2 w-70">
        <input
          type="text"
          placeholder="Байршил оруулах..."
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
          className="border rounded-md px-3 py-2 text-sm flex-1 focus:outline-none"
        />
        <button onClick={handleLocationSearch} className="bg-[#0A427A] text-white px-4 rounded-md text-sm hover:bg-black transition cursor-pointer">
          Очих
        </button>
      </div>

      <BookingStyleMap allClubs={allClubs} userLocation={userLocation} isLoading={isLoading} currentLocation={currentLocation} />
    </div>
  );
};
export default MapPage;

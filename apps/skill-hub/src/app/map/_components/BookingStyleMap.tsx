'use client';

import { NewClubType } from '@/lib/utils/types';
import React, { useEffect, useMemo, useState } from 'react';
import MapSideBar from './MapSideBar';
import UserMapContent from './UserMapContent';

export const BookingStyleMap = ({ allClubs }: { allClubs: NewClubType[] }) => {
  const [userLocation, setUserLoaction] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState(13);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (p) => setUserLoaction([p.coords.latitude, p.coords.longitude]),
      () => setUserLoaction([47.9189, 106.9175]),
    );
  }, []);

  const visibleClubs = useMemo(() => {
    if (!bounds) return [];
    return allClubs.filter((c) => bounds.contains([c.clubLat, c.clubLong]));
  }, [bounds, allClubs]);

  if (!userLocation) return <div className="h-screen grid place-items-center">Ачааллаж байна</div>;
  return (
    <div>
      <MapSideBar visibleClubs={visibleClubs} sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} hoveredClubId={hoveredClubId} setHoveredClubId={setHoveredClubId} />
      <UserMapContent visibleClubs={visibleClubs} userLocation={userLocation} zoom={zoom} setZoom={setZoom} setBounds={setBounds} hoveredClubId={hoveredClubId} sidebarOpen={sidebarOpen} />
    </div>
  );
};

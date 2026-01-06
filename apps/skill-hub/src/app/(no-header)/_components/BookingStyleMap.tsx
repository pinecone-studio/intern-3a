'use client';

import { NewClubType } from '@/lib/utils/types';
import React, { useState } from 'react';
import MapSideBar from './MapSideBar';
import UserMapContent from './UserMapContent';

export const BookingStyleMap = ({ allClubs, userLocation }: { allClubs: NewClubType[]; userLocation: [number, number] }) => {
  const [zoom, setZoom] = useState(17);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visibleClubs = bounds ? allClubs.filter((c) => bounds.contains([c.clubLat, c.clubLong])) : allClubs;

  return (
    <div className="w-full h-screen">
      <MapSideBar visibleClubs={visibleClubs} sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} hoveredClubId={hoveredClubId} setHoveredClubId={setHoveredClubId} />
      <UserMapContent visibleClubs={visibleClubs} userLocation={userLocation} zoom={zoom} setZoom={setZoom} setBounds={setBounds} hoveredClubId={hoveredClubId} sidebarOpen={sidebarOpen} />
    </div>
  );
};

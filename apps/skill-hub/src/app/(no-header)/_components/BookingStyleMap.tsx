'use client';

import { NewClubType } from '@/lib/utils/types';
import { LatLngBounds } from 'leaflet';
import React, { useState } from 'react';
import MapSideBar from './MapSideBar';
import UserMapContent from './UserMapContent';

export const BookingStyleMap = ({ allClubs, userLocation, isLoading }: { allClubs: NewClubType[]; userLocation: [number, number]; isLoading: boolean }) => {
  const [zoom, setZoom] = useState(17);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visibleClubs = bounds ? allClubs.filter((c) => bounds.contains([c.clubLat, c.clubLong])) : allClubs;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MapSideBar
        visibleClubs={visibleClubs}
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        hoveredClubId={hoveredClubId}
        setHoveredClubId={setHoveredClubId}
        isLoadingClubs={isLoading}
      />
      <div className={`absolute top-0 bottom-0 right-0 transiton-all duration-300 ${sidebarOpen ? 'left-85' : 'left-0'}`}>
        <UserMapContent visibleClubs={visibleClubs} userLocation={userLocation} zoom={zoom} setZoom={setZoom} setBounds={setBounds} hoveredClubId={hoveredClubId} sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
};

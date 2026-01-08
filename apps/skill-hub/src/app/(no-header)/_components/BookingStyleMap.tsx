'use client';

import { ClassLevelsType, NewClubType } from '@/lib/utils/types';
import { LatLngBounds } from 'leaflet';
import React, { useState } from 'react';
import MapSideBar from './MapSideBar';
import UserMapContent from './UserMapContent';

export const BookingStyleMap = ({ allClubs, userLocation }: { allClubs: NewClubType[]; userLocation: [number, number] }) => {
  const [zoom, setZoom] = useState(17);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);
  const [hoveredClubId, setHoveredClubId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<ClassLevelsType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  let visibleClubs = bounds ? allClubs.filter((c) => bounds.contains([c.clubLat, c.clubLong])) : allClubs;

  if (selectedLevel) {
    visibleClubs = visibleClubs.filter((club) => club.selectedClassLevelNames?.some((lvl) => selectedLevel.includes(lvl)));
  }

  if (selectedCategory) {
    visibleClubs = visibleClubs.filter((club) => club.clubCategoryName === selectedCategory);
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MapSideBar
        visibleClubs={visibleClubs}
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        hoveredClubId={hoveredClubId}
        setHoveredClubId={setHoveredClubId}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className={`absolute top-0 bottom-0 right-0 transiton-all duration-300 ${sidebarOpen ? 'left-85' : 'left-0'}`}>
        <UserMapContent visibleClubs={visibleClubs} userLocation={userLocation} zoom={zoom} setZoom={setZoom} setBounds={setBounds} hoveredClubId={hoveredClubId} sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
};

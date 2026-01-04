'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export const MainPageUserLocationMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setUserLocation([47.9189, 106.9175]);
      },
    );
  }, []);

  if (!userLocation) {
    <div className="w-full h-150 flex justify-center items-center">Газрын зураг ачааллаж байна…</div>;
  }

  return (
    <div className="w-full h-150">
      <MapContainer center={userLocation} zoom={13} scrollWheelZoom className="w-full h-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

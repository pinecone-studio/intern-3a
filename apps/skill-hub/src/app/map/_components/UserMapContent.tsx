'use client';

import { NewClubType } from '@/lib/utils/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

type UserMapContentProps = {
  visibleClubs: NewClubType[];
  userLocation: [number, number];
  zoom: number;
  setZoom: (z: number) => void;
  setBounds: (b: L.LatLngBounds) => void;
  hoveredClubId: string | null;
  sidebarOpen: boolean;
};

export default function UserMapContent({ visibleClubs, userLocation, zoom, setZoom, setBounds, hoveredClubId, sidebarOpen }: UserMapContentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });

      const map = L.map(mapRef.current!).setView(userLocation, zoom);
      mapInstance.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(map);

      map.on('moveend zoomend', () => {
        setZoom(map.getZoom());
        setBounds(map.getBounds());
      });

      L.circle(userLocation, {
        radius: zoom >= 15 ? 300 : zoom >= 13 ? 800 : 3000,
        color: '#2563eb',
        fillOpacity: 0.15,
      }).addTo(map);

      L.marker(userLocation).addTo(map).bindPopup('Таны байршил');
    })();

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    (async () => {
      const L = (await import('leaflet')).default;

      map.eachLayer((l: any) => {
        if (l._icon) map.removeLayer(l);
      });

      visibleClubs.forEach((club) => {
        const isHovered = hoveredClubId === club._id;

        L.marker([club.clubLat, club.clubLong], {
          icon: L.divIcon({
            className: '',
            html: `<div style="
              background:${isHovered ? '#f97316' : '#2563eb'};
              width:${isHovered ? 20 : 14}px;
              height:${isHovered ? 20 : 14}px;
              border-radius:50%;
              transform:translate(-50%, -50%)"></div>`,
          }),
        })
          .addTo(map)
          .bindTooltip(
            `<div>
              <img src="${club.clubImage}" style="width:100%; height:100px; object-fit:cover; border-radius:6px"/>
              <strong>${club.clubName}</strong>
            </div>`,
            { direction: 'top', offset: [0, -10] },
          );
      });
    })();
  }, [visibleClubs, hoveredClubId]);

  return <div ref={mapRef} className={`h-full transition-all duration-300 ${sidebarOpen ? 'ml-95' : 'ml-0'}`} />;
}

'use client';

import { NewClubType } from '@/lib/utils/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';

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
  const userMarkerRef = useRef<L.Marker | null>(null);
  const clubLayerRef = useRef<L.LayerGroup | null>(null);
  const [locateLoading, setLocateLoading] = useState(false);
  const hasFittedRef = useRef(false);

  useEffect(() => {
    if (!mapRef.current || !userLocation || mapInstance.current) return;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });

      const map = L.map(mapRef.current!);
      mapInstance.current = map;
      map.setView(userLocation, 17);

      setZoom(map.getZoom());
      setBounds(map.getBounds());

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

      const userMarketHtml = `
      <div style="position: relative; width: 60px; height: 80px;">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="42"
          height="64"
          fill="#dc2626" 
          stroke="white"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="
            position:absolute;
            bottom:0;
            left:50%;
            transform:translateX(-50%);
            z-index:2;
          "
        >
          <path d="M12 22s8-4 8-10a8 8 0 1 0-16 0c0 6 8 10 8 10z"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
        </svg>
      </div>
    `;

      L.marker(userLocation, {
        icon: L.divIcon({
          html: userMarketHtml,
          className: '',
          iconAnchor: [30, 80],
        }),
        zIndexOffset: 1000,
      })
        .addTo(map)
        .bindPopup('Таны байршил');

      clubLayerRef.current = L.layerGroup().addTo(map);
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

      if (!clubLayerRef.current) {
        clubLayerRef.current = L.layerGroup().addTo(map);
      } else {
        clubLayerRef.current.clearLayers();
      }

      visibleClubs.forEach((club) => {
        const isHovered = hoveredClubId === club._id;

        const markerHtml = `
        <div style="position: relative; width: 60px; height: 80px;">

        ${
          isHovered
            ? `<span style="
          position: absolute;
          bottom: 5px;
          left: 50%;
          width: 18px;
          height: 18px;
          background: rgba(10,66,122,0.35);
          border-radius: 50%;
          transform:translateX(-50%);
          animation:pulse 1.4s ease-out infinite;
          z-index:1;
          "></span>`
            : ''
        }

        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="${isHovered ? 42 : 34}"
        height="${isHovered ? 64 : 50}"
        fill="#0A427A"
        stroke="white"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="
          position:absolute;
          bottom:0;
          left:50%;
          transform:translateX(-50%);
          transition:all 0.25s ease;
          z-index:2;
          animation: ${isHovered ? 'bounce 0.6s ease infinite alternate' : 'none'}
        "
      >
        <path d="M12 22s8-4 8-10a8 8 0 1 0-16 0c0 6 8 10 8 10z"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>

      <style>
        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(-50%) scale(2.4);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0% { 
            transform: translateX(-50%) translateY(0); 
          }
          100% { 
            transform: translateX(-50%) translateY(-8px); 
          }
        }
      </style>
    </div>
    `;

        const marker = L.marker([club.clubLat, club.clubLong], {
          icon: L.divIcon({
            html: markerHtml,
            className: '',
            iconAnchor: [30, 80],
          }),
        });

        marker.bindTooltip(
          `<div>
              <img src="${club.clubImage}" style="width:100%; height:100px; object-fit:cover; border-radius:6px"/>
              <strong>${club.clubName}</strong>
            </div>`,
          { direction: 'top', offset: [0, -12] },
        );

        clubLayerRef.current!.addLayer(marker);
      });
    })();
  }, [visibleClubs, hoveredClubId]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || visibleClubs.length === 0) return;
    if (hasFittedRef.current) return;

    const bounds = L.latLngBounds([userLocation, ...visibleClubs.map((c) => [c.clubLat, c.clubLong] as [number, number])]);

    map.fitBounds(bounds, {
      padding: [60, 60],
      maxZoom: 16,
    });

    hasFittedRef.current = true;
  }, [visibleClubs]);

  const handleLocateMe = () => {
    if (!mapInstance.current) return;

    mapInstance.current.setView(userLocation, 16, { animate: true });
  };

  return (
    <>
      <div ref={mapRef} className={`w-full h-screen transition-all duration-300 ${sidebarOpen ? 'ml-85' : 'ml-0'}`} />

      {/* <LocateFixed onClick={handleLocateMe} className="absolute bottom-6 left-6 z-\[1000]\ shadow-lg" /> */}
    </>
  );
}

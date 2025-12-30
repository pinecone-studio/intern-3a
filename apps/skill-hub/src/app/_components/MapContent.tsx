'use client';

import { NewClubType } from '@/lib/utils/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Props = {
  clubs: NewClubType[];
  userLocation: [number, number] | null;
  nearbyClubs: NewClubType[];
  selectedRadius: number;
};

export default function MapContent({ clubs, userLocation, nearbyClubs, selectedRadius }: Props) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if ((mapRef.current as any)._leaflet_id) {
      (mapRef.current as any)._leaflet_id = null;
      mapRef.current.innerHTML = '';
    }

    const center: [number, number] = userLocation ?? (nearbyClubs.length ? [nearbyClubs[0].clubLat, nearbyClubs[0].clubLong] : [clubs[0].clubLat, clubs[0].clubLong]);

    const map = L.map(mapRef.current).setView(center, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (userLocation) {
      L.marker(userLocation).addTo(map).bindPopup('Таны байршил');
      L.circle(userLocation, {
        radius: selectedRadius * 1000,
        color: 'blue',
        fillOpacity: 0.15,
      }).addTo(map);
    }

    const displayClubs = nearbyClubs.length ? nearbyClubs : clubs;
    // displayClubs.forEach((club) => {
    //   L.marker([club.clubLat, club.clubLong]).addTo(map).bindPopup(club.clubName, );
    // });

    displayClubs.forEach((club) => {
      const popupContent = `
    <div style="text-align:center; width:180px;">
      <img 
        src="${club.clubImage}" 
        alt="${club.clubName}"
        style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:6px;"
      />
      <strong>${club.clubName}</strong>
      <br />
      <button 
        id="btn-${club._id}" 
        variant={"ghost}
        style="
          margin-top:6px;
          padding:6px 10px;
          background:#FCB027;
          color:white;
          border:none;
          border-radius:6px;
          cursor:pointer;
        "
      >
        Дэлгэрэнгүй
      </button>
    </div>
  `;

      const marker = L.marker([club.clubLat, club.clubLong]).addTo(map);
      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-${club._id}`);
        if (btn) {
          btn.onclick = () => {
            console.log('Clicked club:', club);
            router.push(`/club/${club._id}`);
          };
        }
      });
    });

    return () => {
      map.remove();
    };
  }, [clubs, nearbyClubs, userLocation, selectedRadius]);

  return <div ref={mapRef} className="m-auto shadow-lg rounded-2xl border-2 border-slate-200 overflow-hidden h-150 w-6xl" />;
}

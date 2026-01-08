'use client';

import { useEffect, useRef } from 'react';

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function MapView({ lat, lng, zoom = 15 }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // Default icon setup
      const DefaultIcon = L.icon({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!mapRef.current) return;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      const map = L.map(mapRef.current).setView([lat, lng], zoom);
      leafletMapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      // Зөвхөн Pin нэмэх (Popup-гүй)
      L.marker([lat, lng]).addTo(map);
    })();
  }, [lat, lng, zoom]);

  return <div ref={mapRef} className="w-full h-full min-h-100 rounded-xl" />;
}

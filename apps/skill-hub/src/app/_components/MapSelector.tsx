'use client';

import { useEffect, useRef } from 'react';

interface MapSelectorProps {
  lat: number | null;
  lng: number | null;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function MapSelector({ lat, lng, setLat, setLng, onLocationSelect }: MapSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

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

      const map = L.map(mapRef.current).setView([lat || 47.9185, lng || 106.917], 13);
      leafletMapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Default marker at current position
      const currentMarker = L.marker([lat || 47.9185, lng || 106.917])
        .addTo(map)
        .bindPopup('Салоны байршил');

      // Handle map clicks to update position
      map.on('click', (e: any) => {
        const { lat: newLat, lng: newLng } = e.latlng;

        setLat(newLat);
        setLng(newLng);
        onLocationSelect?.(newLat, newLng);

        // Update marker position
        currentMarker.setLatLng([newLat, newLng]);
        map.setView([newLat, newLng], 13);
      });
    })();
  }, []);

  return (
    <div>
      <div ref={mapRef} className="w-full h-64 rounded border border-gray-300 cursor-crosshair" />
      <p className="text-xs text-gray-500 mt-2">💡 Газрын зураг дээр дарж байршилаа сонгоно уу</p>
    </div>
  );
}

'use client';

import { NewClubType } from '@/lib/utils/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Props = {
  clubs: NewClubType[];
  userLocation: [number, number] | null;
  nearbyClubs: NewClubType[];
  selectedRadius: number;
};

export default function MapContent({ clubs, userLocation, nearbyClubs, selectedRadius }: Props) {
  if (!clubs.length) {
    return (
      <div className="m-auto shadow-lg rounded-2xl border-2 border-slate-200 h-50 w-287.5 flex justify-center items-center">
        <p className="text-slate-500 text-lg">Газрын зураг дээр харуулах клуб олдсонгүй</p>
      </div>
    );
  }

  const center: [number, number] = userLocation ?? (nearbyClubs.length ? [nearbyClubs[0].clubLat, nearbyClubs[0].clubLong] : [clubs[0].clubLat, clubs[0].clubLong]);

  const displayClubs = nearbyClubs.length ? nearbyClubs : clubs;

  return (
    <div className="m-auto shadow-lg rounded-2xl border-2 border-slate-200 overflow-hidden h-150 w-288">
      <MapContainer center={center} zoom={13} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

        {userLocation && (
          <>
            <Marker position={userLocation}>
              <Popup>Таны байршил</Popup>
            </Marker>

            <Circle center={userLocation} radius={selectedRadius * 1000} pathOptions={{ color: 'blue', fillOpacity: 0.15 }} />
          </>
        )}

        {displayClubs.map((club) => (
          <Marker key={club._id} position={[club.clubLat, club.clubLong]}>
            <Popup>
              <div className="cursor-pointer flex flex-col gap-1 items-center w-40">
                <img src={typeof club.clubImage === 'string' ? club.clubImage : ''} alt={club.clubName} className="w-full rounded" />
                <h4 className="text-sm font-semibold">{club.clubName}</h4>
                <p className="text-xs text-gray-600">{club.teacherName}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

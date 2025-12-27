'use client';

import L from 'leaflet';
import { useRouter } from 'next/navigation';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import { Club } from "@/lib/mock-data";
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// type Props = {
//   clubs: Club[];
//   userLocation: [number, number] | null;
//   nearbyClubs: Club[];
//   selectedRadius: number;
// };

export default function MapContent({ clubs, userLocation, nearbyClubs, selectedRadius }: Props) {
  const router = useRouter();

  if (!clubs.length)
    return (
      <div className="m-auto shadow-lg rounded-2xl border-2 border-slate-200  h-50 w-287.5 flex justify-center items-center">
        <p className="text-slate-500 text-lg">Газрын зураг дээр харуулах клуб олдсонгүй</p>
      </div>
    );

  const center: [number, number] = userLocation ? userLocation : nearbyClubs.length ? [nearbyClubs[0].lat, nearbyClubs[0].lon] : [clubs[0].lat, clubs[0].lon];

  const displayClubs = nearbyClubs.length ? nearbyClubs : clubs;

  return (
    <div className="m-auto shadow-lg rounded-2xl border-2 border-slate-200 overflow-hidden h-150 w-288">
      <MapContainer center={center} zoom={13} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />

        {userLocation && (
          <div>
            <Marker position={userLocation}>
              <Popup>Таны байршил</Popup>
            </Marker>

            <Circle center={userLocation} radius={selectedRadius * 1000} pathOptions={{ color: 'blue', fillOpacity: 0.1 }} />
          </div>
        )}

        {displayClubs.map((club) => (
          <Marker key={club._id} position={[club.lat, club.lon]}>
            <Popup>
              <div
                className="cursor-pointer flex flex-col gap-1 items-center w-40"

                // onClick={() => router.push(`/clubs/${club._id}`)}
              >
                <img src={club.clubImage} alt={club.clubCategoryName} className="w-full rounded-1" />
                <h4 className="m-0">{club.clubCategoryName}</h4>
                <p className="m-0 text-3">{club.teacherName}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

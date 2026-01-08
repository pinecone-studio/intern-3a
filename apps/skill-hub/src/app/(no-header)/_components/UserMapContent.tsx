'use client';

import { NewClubType } from '@/lib/utils/types';
import type { LatLngBounds } from 'leaflet';
import { LocateFixed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

type UserMapContentProps = {
  visibleClubs: NewClubType[];
  userLocation: [number, number];
  zoom: number;
  setZoom: (z: number) => void;
  setBounds: (b: LatLngBounds) => void;
  hoveredClubId: string | null;
  sidebarOpen: boolean;
  currentLocation: [number, number] | null;
};

export default function UserMapContent({ visibleClubs, userLocation, zoom, setZoom, setBounds, hoveredClubId, sidebarOpen, currentLocation }: UserMapContentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const clubLayerRef = useRef<L.LayerGroup | null>(null);
  const hasFittedRef = useRef(false);
  const router = useRouter();
  const userCircleRef = useRef<L.Circle | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

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

      if (mapRef.current && !(mapRef.current as any)._leaflet_id) {
        const map = L.map(mapRef.current, {
          zoomControl: false,
        });
        mapInstance.current = map;
        map.setView(userLocation, 17);

        L.control.zoom({ position: 'topright' }).addTo(map);

        setZoom(map.getZoom());
        setBounds(map.getBounds());

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
        }).addTo(map);

        map.on('moveend zoomend', () => {
          setZoom(map.getZoom());
          setBounds(map.getBounds());

          if (userCircleRef.current) {
            const z = map.getZoom();
            userCircleRef.current.setRadius(z >= 15 ? 300 : z >= 13 ? 800 : 3000);
          }
        });

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

        userCircleRef.current = L.circle(userLocation, {
          radius: 1000,
          color: '#2563eb',
          weight: 2,
          fillColor: '#0A427A',
          fillOpacity: 0.15,
          dashArray: '5,10',
        }).addTo(map);

        map.on('zoomend', () => {
          if (!userCircleRef.current || !mapInstance.current) return;

          const zoom = mapInstance.current.getZoom();
          const baseRadius = 500;
          const zoomFactor = Math.pow(2, 17 - zoom);
          userCircleRef.current.setRadius(baseRadius * zoomFactor);
        });

        userMarkerRef.current = L.marker(userLocation, {
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
      }
    })();

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [userLocation]);

  useEffect(() => {
    if (!mapInstance.current) return;

    (async () => {
      const L = (await import('leaflet')).default;

      if (!clubLayerRef.current) {
        clubLayerRef.current = L.layerGroup().addTo(mapInstance.current!);
      } else {
        clubLayerRef.current.clearLayers();
      }

      visibleClubs.forEach((club) => {
        const isHovered = hoveredClubId === club._id;

        const markerHtml = `
        <div style="position: relative; width: 60px; height: 100px;">

        ${
          isHovered
            ? `<span style="
          position: absolute;
          bottom: 5px;
          left: 50%;
          width: 20px;
          height: 20px;
          background: rgba(10,66,122,0.35);
          border-radius: 50%;
          transform:translateX(-50%);
          animation:pulse 0.6s ease-out infinite;
          z-index:1;
          "></span>`
            : ''
        }

        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="${isHovered ? 48 : 40}"
        height="${isHovered ? 72 : 60}"
        fill="#0A427A"
        stroke="white"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="
          position:absolute;
          bottom:0;
          left:50%;
          transform:translateX(-50%) scale(${isHovered ? 1.1 : 1});
          transition:transform 0.25s ease, width 0.25s ease, height 0.25s ease;
          z-index:2;
          animation: ${isHovered ? 'bounce 0.2s ease infinite alternate' : 'none'}
        "
      >
        <path d="M12 22s8-4 8-10a8 8 0 1 0-16 0c0 6 8 10 8 10z"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>

      <style>
        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.9;
          }
          100% {
            transform: translateX(-50%) scale(4.4);
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
          `<div style="width:150px; border-radius:14px overflow-hidden">
              <img src="${club.clubImage}" style="width:100%; height:120px; object-fit:cover; border-radius:6px"/>
              <strong style=" display: -webkit-box;
              -webkit-line-clamp: 1; /
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;">${club.clubName}</strong>
            </div>`,
          { direction: 'top', offset: [0, -12], opacity: 1, permanent: false, interactive: true, className: 'club-tooltip' },
        );

        marker.on('mouseover', () => {
          marker.openTooltip();
        });

        marker.on('mouseout', () => {
          setTimeout(() => {
            if (!marker.isTooltipOpen()) return;
            marker.closeTooltip();
          }, 100);
        });

        marker.on('tooltipopen', (e) => {
          const el = e.tooltip.getElement();
          if (!el) return;

          el.addEventListener('mouseenter', () => {
            marker.openTooltip();
          });

          el.addEventListener('mouseleave', () => {
            marker.closeTooltip();
          });
          const content = el.querySelector<HTMLElement>('.club-tooltip-content');
          if (!content) return;
          content.addEventListener('click', () => {
            const id = content.dataset.clubId;
            if (id) router.push(`club/${id}`);
          });
        });

        clubLayerRef.current!.addLayer(marker);
      });
    })();
  }, [visibleClubs, hoveredClubId]);

  useEffect(() => {
    if (!mapInstance.current || hasFittedRef.current || visibleClubs.length === 0) return;

    (async () => {
      const L = (await import('leaflet')).default;

      const bounds = L.latLngBounds([userLocation, ...visibleClubs.map((c) => [c.clubLat, c.clubLong] as [number, number])]);

      mapInstance?.current?.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 16,
      });

      hasFittedRef.current = true;
    })();
  }, [visibleClubs, userLocation]);

  useEffect(() => {
    if (!mapInstance.current) return;

    const timer = setTimeout(() => {
      mapInstance.current?.invalidateSize();
    }, 350);

    return () => clearTimeout(timer);
  }, [sidebarOpen]);

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-6 right-6 z-1000">
        <button
          onClick={() => {
            if (!mapInstance.current || !currentLocation) return;

            mapInstance.current.setView(currentLocation, 17, { animate: true, duration: 0.8 });

            if (userCircleRef.current) userCircleRef.current.setLatLng(currentLocation);
            if (userMarkerRef.current) userMarkerRef.current.setLatLng(currentLocation);
          }}
          className="bg-white rounded-full p-3 shadow-lg hover:scale-105 transition"
          title="Миний байршил"
        >
          <LocateFixed className="w-6 h-6 text-[#0A427A] cursor-pointer" />
        </button>
      </div>
    </>
  );
}

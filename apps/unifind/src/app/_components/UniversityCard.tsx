'use client';
import { Building2, GraduationCap, Landmark, MapPin, Palette, School } from 'lucide-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

type UniversityCardProps = {
  id: number;
  name: string;
  location: string;
  image: string;
  status: 'open' | 'closing-soon' | 'closed';
  minScore?: string;
  admissionRate?: string | null;
  deadline?: string | null;
  nextCycle?: string | null;
};

const getIconForUniversity = (name: string) => {
  if (name.includes('Tech')) return Building2;
  if (name.includes('Liberal Arts')) return Landmark;
  if (name.includes('Science')) return School;
  if (name.includes('Business')) return Building2;
  if (name.includes('Arts')) return Palette;
  return GraduationCap;
};

export default function UniversityCard({ id, name, location, image, status, minScore }: UniversityCardProps) {
  const router = useRouter();
  const Icon = getIconForUniversity(name);

  const handleViewDetails = () => {
    router.push(`/detail/${id}`);
  };

  // ✅ Image fallback component
  const ImageWithFallback = ({ src }: { src: string }) => {
    const [imgSrc, setImgSrc] = useState(src || '/university-logo-arts.jpg');
    return <img src={imgSrc} alt={name} className="w-full h-full object-cover rounded-md" onError={(e) => (e.currentTarget.src = '/university-logo-arts.jpg')} />;
  };

  return (
    <Card onClick={handleViewDetails} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mt-0 pt-0">
      <div className="relative h-48">
        {/* ✅ Fallback image ашиглаж харуулах */}
        <ImageWithFallback src={image} />

        <div className="absolute top-4 right-4">
          {status === 'open' && <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Нээлттэй</span>}
          {status === 'closing-soon' && <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Удахгүй хаагдана</span>}
          {status === 'closed' && <span className="bg-slate-400 text-white text-xs font-semibold px-3 py-1 rounded-full">Хаагдсан</span>}
        </div>
      </div>

      <div className="p-4 pt-0 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#00BCD4]/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-sky-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-sm border-t pt-2">
          <span>Босго оноо</span>
          <span className="font-semibold">{minScore ?? '–'}</span>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation(); // давхар click-оос сэргийлэх
            handleViewDetails();
          }}
          variant="outline"
          className="w-full border-sky-600 cursor-pointer text-sky-600 hover:bg-sky-600 hover:text-white"
        >
          Дэлгэрэнгүй
        </Button>
      </div>
    </Card>
  );
}

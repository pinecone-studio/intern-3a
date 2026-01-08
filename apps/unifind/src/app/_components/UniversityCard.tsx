'use client';
import { GraduationCap, Landmark, MapPin, Palette, School, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UniversityCardProps } from '../../lib/types/type';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const getIconForUniversity = (name: string) => {
  if (name.includes('Tech') || name.includes('Технологи')) return School;
  if (name.includes('Arts') || name.includes('Урлаг')) return Palette;
  if (name.includes('Medical') || name.includes('Анагаах')) return Landmark;
  return GraduationCap;
};

export default function UniversityCard({ id, name, location, image, status, minScore }: UniversityCardProps) {
  const router = useRouter();
  const Icon = getIconForUniversity(name);

  const handleViewDetails = () => {
    router.push(`/detail/${id}`);
  };

  const ImageWithFallback = ({ src }: { src: string }) => {
    const [imgSrc] = useState(src || '/university-logo-arts.jpg');
    return <img src={imgSrc} alt={name} className="w-full h-full object-cover rounded-md" onError={(e) => (e.currentTarget.src = '/university-logo-arts.jpg')} />;
  };

  return (
    <Card onClick={handleViewDetails} className="overflow-hidden hover:shadow-lg dark:bg-gray-900 transition-shadow cursor-pointer pt-0">
      <div className="relative h-58">
        <ImageWithFallback src={image} />

        <div className="absolute top-4 right-4">
          {status === 'open' && <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Нээлттэй</span>}
          {status === 'closing-soon' && <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Удахгүй хаагдана</span>}
          {status === 'closed' && <span className="bg-slate-400 text-white text-xs font-semibold px-3 py-1 rounded-full">Хаагдсан</span>}
        </div>
      </div>

      <div className="pl-5 pr-5 space-y-2 pb-0">
        <div className="flex items-start gap-2 lg:gap-3 min-h-18">
          <div className="bg-[#00BCD4]/10 p-2 rounded-lg shrink-0">
            <Icon className="h-5 w-5 text-sky-500" />
          </div>

          <div className="flex-1 max-w-[calc(100%-3rem)]">
            <h3 className="font-bold text-lg line-clamp-2 min-h-6">{name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-y border-gray-50 dark:border-neutral-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Босго оноо</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-black text-gray-800 dark:text-gray-100 text-lg">
                {minScore || '460'}
                <span className="text-sky-500">+</span>
              </span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-gray-100 dark:bg-neutral-800" />

          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Хөтөлбөр</span>
            <p className="font-bold text-gray-700 dark:text-gray-200 text-sm">30+ сонголт</p>
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          variant="outline"
          className="w-full border-sky-500 cursor-pointer dark:hover:bg-sky-500 daark:hover:text-white text-sky-500 hover:bg-sky-500 hover:text-white"
        >
          Дэлгэрэнгүй
        </Button>
      </div>
    </Card>
  );
}

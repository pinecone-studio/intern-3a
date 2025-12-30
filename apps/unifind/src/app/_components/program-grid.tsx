'use client';

import { Grid3x3, List, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Pagination } from './pagination';
import { ProgramCard } from './program-card';

type Program = {
  id: number;
  name: string;
  location: string;
  image: string;
  logo: string;
  type: 'Public' | 'Private';
  tags: string[];
  minScore: string;
  maxScore: string;
  deadline: string;
  deadlineColor: string;
};

const programs: Program[] = [
  {
    id: 1,
    name: 'Технологийн Улсын Их Сургууль',
    location: 'Бостон, MA, АНУ',
    image: '/modern-university-building.png',
    logo: '/university-shield-logo.jpg',
    type: 'Public',
    tags: ['Инженерчлэл & Технологи', 'Top 50'],
    minScore: '680',
    maxScore: '1000',
    deadline: '10-р сарын 15',
    deadlineColor: 'text-orange-600',
  },
  {
    id: 2,
    name: 'Кембрижийн Бизнесийн Сургууль',
    location: 'Кембриж, Их Британи',
    image: '/modern-glass-business-school-building.jpg',
    logo: '/business-school-crest.jpg',
    type: 'Private',
    tags: ['Менежмент', 'MBA'],
    minScore: '720',
    maxScore: '800',
    deadline: '9-р сарын 30',
    deadlineColor: 'text-red-600',
  },
  {
    id: 3,
    name: 'Үндэсний Урлагийн Институт',
    location: 'Нью-Йорк, NY, АНУ',
    image: '/red-brick-arts-institute-building-with-green-lawn.jpg',
    logo: '/arts-institute-logo.jpg',
    type: 'Public',
    tags: ['Дүрслэх Урлаг', 'Дизайн'],
    minScore: 'Портфолио',
    maxScore: '',
    deadline: '11-р сарын 01',
    deadlineColor: 'text-green-600',
  },
  {
    id: 4,
    name: 'Хатан хааны Анагаах Ухааны Коллеж',
    location: 'Лондон, Их Британи',
    image: '/modern-medical-school-glass-building.jpg',
    logo: '/medical-college-emblem.png',
    type: 'Private',
    tags: ['Анагаах ухаан', 'Эрүүл мэнд'],
    minScore: '850',
    maxScore: '1000',
    deadline: '12-р сарын 01',
    deadlineColor: 'text-gray-900',
  },
  {
    id: 5,
    name: 'Номхон Далайн Их Сургууль',
    location: 'Сан Диего, CA, АНУ',
    image: '/university-marine-science-building-exterior.jpg',
    logo: '/ocean-university-seal.jpg',
    type: 'Public',
    tags: ['Далайн Биологи', 'Шинжлэх Ухаан'],
    minScore: '600',
    maxScore: '1000',
    deadline: '10-р сарын 20',
    deadlineColor: 'text-orange-600',
  },
  {
    id: 6,
    name: 'Сэнт Майклс Хуулийн Сургууль',
    location: 'Чикаго, IL, АНУ',
    image: '/historic-clock-tower-law-school-building-blue-sky.jpg',
    logo: '/law-school-badge.jpg',
    type: 'Private',
    tags: ['Хууль', 'Бодлого'],
    minScore: '700',
    maxScore: '1000',
    deadline: '1-р сарын 15',
    deadlineColor: 'text-gray-900',
  },
];

export function ProgramGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div>
      {/* Гарчиг */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-balance">Ирээдүйн их сургуулиа ол</h1>
        <p className="text-gray-600">Таны шалгуурт нийцсэн 1,240 хөтөлбөр олдлоо</p>
      </div>

      {/* Идэвхтэй шүүлтүүрүүд */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm">
          <span>Бизнес & Менежмент</span>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm">
          <span>Доод оноо: 650+</span>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 text-sm p-0 h-auto font-medium">
          Бүгдийг цэвэрлэх
        </Button>
      </div>

      {/* Удирдлагууд */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Эрэмбэлэх:</span>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-45 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Санал болгосон</SelectItem>
              <SelectItem value="score">Доод оноо</SelectItem>
              <SelectItem value="deadline">Элсэлтийн хугацаа</SelectItem>
              <SelectItem value="name">Нэрээр</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="text-gray-400">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
          <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('grid')}>
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="icon" className="w-8 h-8" onClick={() => setViewMode('list')}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Хөтөлбөрүүд */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>

      {/* Хуудаслалт */}
      <Pagination />
    </div>
  );
}

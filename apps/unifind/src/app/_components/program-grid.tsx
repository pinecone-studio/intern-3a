'use client';

import { Grid3x3, List, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import useSWR from 'swr';
import { University } from '../../lib/types/type';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Pagination } from './pagination';
import { ProgramCard } from './program-card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function ProgramGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [programs, setPrograms] = useState<University[]>([]);
  const { data, error, isLoading } = useSWR<University[]>('/api/universities', fetcher);

  console.log({ data });
  useEffect(() => {
    if (data) setPrograms(data);
  }, [data]);
  console.log({ data });
  if (isLoading) return <p>Уншиж байна...</p>;
  if (error) return <p>Өгөгдөл авахад алдаа гарлаа</p>;

  return (
    <div>
      {/* Гарчиг */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-balance">Ирээдүйн их сургуулиа ол</h1>
        {/* <p className="text-gray-600">Таны шалгуурт нийцсэн 1,240 хөтөлбөр олдлоо</p> */}
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

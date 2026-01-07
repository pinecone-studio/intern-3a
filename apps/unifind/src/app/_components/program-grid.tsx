'use client';
import { Info, LayoutGrid, List, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ProgramCard } from './program-card';

export function ProgramGrid({ programs, isLoading, filters, setFilters, resetFilters }: any) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const safePrograms = Array.isArray(programs) ? programs : [];

  const { data: majors = [] } = useSWR('/api/majors');

  const groupedData = useMemo(() => {
    if (filters.majorNames.length === 0) {
      return [{ title: 'Бүх сургуулиуд', list: safePrograms }];
    }

    return filters.majorNames.map((name: string) => ({
      title: name,
      list: safePrograms.filter((u: any) => u.majors?.some((m: any) => m.name === name)),
    }));
  }, [safePrograms, filters.majorNames]);
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">~ Ирээдүйн их сургуулиа төлөвлө ~</h1>
          {/* <p className="text-gray-500 text-sm mt-1">
            Нийт <span className="text-sky-600 font-bold">{programs.length}</span> сургууль олдлоо
          </p> */}
        </div>

        <div className="flex items-center gap-3">
          <Select value={filters?.sortBy} onValueChange={(val) => setFilters({ ...filters, sortBy: val })}>
            <SelectTrigger className="w-40 bg-white border shadow-sm rounded-xl dark:bg-gray-900 dark:border-neutral-800 dark:border">
              <SelectValue placeholder="Эрэмбэлэх" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-900 dark:border-neutral-800">
              <SelectItem className="dark:hover:bg-gray-800" value="name">
                Нэрээр (A-Z)
              </SelectItem>
              <SelectItem className="dark:hover:bg-gray-800" value="recommended">
                Санал болгосон
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex bg-white dark:bg-gray-900 dark:border-neutral-800 p-1 rounded-xl shadow-sm border border-gray-100">
            <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={`h-8 w-8 p-0 ${viewMode === 'grid' ? 'bg-sky-50 dark:bg-gray-800 text-sky-600' : 'text-gray-400'}`}>
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={`h-8 w-8 p-0 ${viewMode === 'list' ? 'bg-sky-50 dark:bg-gray-800 text-sky-600' : 'text-gray-400'}`}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {(filters?.majors?.length > 0 || filters?.search || filters?.minScore > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          {filters?.search && <Badge label={`"${filters.search}"`} onRemove={() => setFilters({ ...filters, search: '' })} />}

          {filters?.majors?.map((catId: number) => {
            const catName = majors.find((c: any) => c.id === catId)?.name || 'Категори';
            return (
              <Badge
                key={catId}
                label={catName}
                onRemove={() =>
                  setFilters({
                    ...filters,
                    majors: filters.majors.filter((c: number) => c !== catId),
                  })
                }
              />
            );
          })}

          {filters?.minScore > 0 && <Badge label={`${filters.minScore}+ оноо`} onRemove={() => setFilters({ ...filters, minScore: 0 })} />}

          <Button variant="link" onClick={resetFilters} className="text-xs text-red-500 font-bold h-7">
            Бүгдийг арилгах
          </Button>
        </div>
      )}

      {/* Main list */}
      {safePrograms.length > 0 ? (
        <div className="space-y-12">
          {groupedData.map((group: any) => (
            <div key={group.title} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-sky-500 rounded-full" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{group.title}</h2>
                <span className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 text-gray-500 text-xs px-2 py-1 rounded-lg">
                  Нийт <span className="text-sky-500 font-bold">{group.list.length}</span> сургууль олдлоо
                </span>
              </div>

              {group.list.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {group.list.map((p: any) => (
                    <ProgramCard key={`${group.title}-${p.id}`} program={p} viewMode={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                  <p className="text-gray-400 text-sm italic">"{group.title}" чиглэлээр сургууль олдсонгүй.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState onReset={resetFilters} />
      )}
    </div>
  );
}

function Badge({ label, onRemove }: any) {
  return (
    <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-[13px] font-medium text-gray-700 shadow-sm">
      {label}
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ onReset }: any) {
  return (
    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
      <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Info className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">Илэрц олдсонгүй</h3>
      <p className="text-gray-500 mb-6 text-sm">Шүүлтүүрээ өөрчилж эсвэл цэвэрлэж үзнэ үү.</p>
      <Button onClick={onReset} variant="outline" className="rounded-xl px-8">
        Бүх шүүлтүүрийг цэвэрлэх
      </Button>
    </div>
  );
}

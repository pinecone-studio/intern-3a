'use client';
import { ChevronDown, ChevronUp, GraduationCap, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import useSWR from 'swr';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function FilterSidebar({ filters, setFilters, resetFilters }: any) {
  const [fieldExpanded, setFieldExpanded] = useState(true);
  const { data: majors = [] } = useSWR('/api/majors', fetcher);
  console.log({ majors });

  const handleMajorChange = (name: string, checked: boolean) => {
    const newList = checked ? [...filters.majorNames, name] : filters.majorNames.filter((n: string) => n !== name);

    setFilters({ ...filters, majorNames: newList });
  };
  console.log({ fieldExpanded });

  return (
    <aside className="space-y-6 sticky top-24">
      <div className="bg-white dark:bg-gray-900 dark:border-neutral-800 rounded-2xl shadow-sm border border-gray-100 p-5">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 dark:text-white">
            <GraduationCap className="w-5 h-5 text-sky-500" /> Шүүлтүүр
          </h2>
          <Button variant="ghost" onClick={resetFilters} className="h-8 text-xs text-gray-500 hover:text-sky-500 dark:text-white dark:hover:text-sky-500">
            <RotateCcw className="w-3 h-3 mr-1" /> Шинэчлэх
          </Button>
        </div>

        {/* Search */}
        <div className="space-y-2 mb-6">
          <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Сургуулийн нэр</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Хайх..."
              className="pl-9 bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* majors */}

        <div className="border-t border-gray-50 dark:border-gray-800 pt-4">
          <button onClick={() => setFieldExpanded(!fieldExpanded)} className="flex items-center justify-between w-full mb-4">
            <span className="font-bold text-sm text-gray-700 dark:text-white">Мэргэжлийн чиглэл</span>
            {fieldExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {fieldExpanded && (
            <div className="space-y-2.5 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
              {majors
                .filter((m: any, i: number, arr: any[]) => arr.findIndex((x) => x.name === m.name) === i)
                .map((major: any) => (
                  <div key={major.name} className="flex items-center gap-3 ">
                    <Checkbox checked={filters.majorNames.includes(major.name)} onCheckedChange={(checked) => handleMajorChange(major.name, !!checked)} />
                    <Label>{major.name}</Label>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Promo Box */}
      <div className="bg-sky-500 hover:bg-sky-600 dark:bg-gray-900 dark:border-neutral-800 dark:border rounded-2xl p-6 text-white  relative overflow-hidden group">
        <div className="relative z-10">
          <p className="font-bold mb-1">Тусламж хэрэгтэй юу?</p>
          <p className="text-sky-100 text-xs mb-4 opacity-90">Мэргэжлийн зөвлөх танд чиглүүлэхэд бэлэн байна.</p>
          <Button className="w-full bg-white text-sky-500 hover:bg-sky-50 font-bold shadow-lg shadow-sky-900/20">Зөвлөгөө авах</Button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      </div>
    </aside>
  );
}

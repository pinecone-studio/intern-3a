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
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const { data: universities = [] } = useSWR(query ? `/api/universitySearch?q=${query}` : null, fetcher);

  const handleSelect = (name: string) => {
    setFilters({ ...filters, search: name });
    setQuery(name);
    setOpen(false);
  };

  const [fieldExpanded, setFieldExpanded] = useState(true);
  const { data: majors = [] } = useSWR('/api/majors', fetcher);

  const handleMajorChange = (name: string, checked: boolean) => {
    const newList = checked ? [...filters.majorNames, name] : filters.majorNames.filter((n: string) => n !== name);
    setFilters({ ...filters, majorNames: newList });
  };

  return (
    <aside className="space-y-6 sticky top-24">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-600" /> Шүүлтүүр
          </h2>
          <Button variant="ghost" onClick={resetFilters} className="h-8 text-xs text-gray-500 hover:text-sky-600">
            <RotateCcw className="w-3 h-3 mr-1" /> Шинэчлэх
          </Button>
        </div>

        {/* University Search */}
        <div className="space-y-2 mb-6 relative">
          <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Сургуулийн нэр</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              placeholder="Их сургууль хайх..."
              className="pl-9 bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 transition-all"
            />

            {open && universities.length > 0 && <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpen(false)} />}

            <div className="relative z-50">
              {open && universities.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-xl overflow-hidden p-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {/* Дээд хэсэг - Илэрцийн тоо */}
                  <div className="px-3 py-2 bg-gray-50/50 border-b border-gray-100 mb-1 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Хайлтын илэрц</span>
                    <span className="text-[10px] bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded-md shadow-sm">{universities.length}</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {universities.map((u: any) => (
                      <button
                        key={u.id}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-sky-50 rounded-lg transition-all duration-150 group text-left mb-0.5 last:mb-0"
                        onClick={() => handleSelect(u.name)}
                      >
                        {/* Сургуулийн Icon */}
                        <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center group-hover:bg-sky-600 transition-colors flex-shrink-0">
                          <GraduationCap className="w-5 h-5 text-sky-600 group-hover:text-white" />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="text-[13px] font-semibold text-gray-700 group-hover:text-sky-700 truncate">{u.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-gray-400 flex items-center gap-1">🏫 Их сургууль</span>
                            {u.location && <span className="text-[11px] text-gray-300">• {u.location}</span>}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Majors */}
        <div className="border-t border-gray-50 pt-4">
          <button onClick={() => setFieldExpanded(!fieldExpanded)} className="flex items-center justify-between w-full mb-4">
            <span className="font-bold text-sm text-gray-700">Мэргэжлийн чиглэл</span>
            {fieldExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {fieldExpanded && (
            <div className="space-y-2.5 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
              {majors
                .filter((m: any, i: number, arr: any[]) => arr.findIndex((x) => x.name === m.name) === i)
                .map((major: any) => (
                  <div key={major.name} className="flex items-center gap-3">
                    <Checkbox checked={filters.majorNames.includes(major.name)} onCheckedChange={(checked) => handleMajorChange(major.name, !!checked)} />
                    <Label>{major.name}</Label>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Promo Box */}
      <div className="bg-sky-600 hover:bg-sky-700 rounded-2xl p-6 text-white relative overflow-hidden group">
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

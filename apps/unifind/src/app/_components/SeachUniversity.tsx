'use client';
import { GraduationCap, Loader2, MapPin, School, Search, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { latinToCyrillic } from '../../lib/latinToCyrillic';
import { SearchResult, UniversityCardProps } from '../../lib/types/type';
import { Input } from '../components/ui/input';

export function SearchUniversity({ id }: UniversityCardProps) {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({
    universities: [],
    majors: [],
  });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults({ universities: [], majors: [] });
      setShowDropdown(false);
      return;
    }

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const q = latinToCyrillic(query);
        const res = await fetch(`/api/searchuniversity?q=${encodeURIComponent(q)}`);
        const data: SearchResult = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative hidden md:block w-64 lg:w-72">
      {/* Input Section */}
      <div className="relative group">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-sky-500" /> : <Search className={`w-4 h-4 transition-colors ${query ? 'text-sky-500' : 'text-slate-400'}`} />}
        </div>
        <Input
          placeholder="Сургууль, мэргэжил хайх..."
          className="pl-10 pr-10 rounded-xl h-10 bg-slate-100/50 dark:bg-neutral-800/50 border-transparent focus:bg-white dark:focus:bg-neutral-900 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults({ universities: [], majors: [] });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown  */}
      {showDropdown && (
        <div className="absolute top-full left-0 w-[320px] lg:w-[380px] mt-2 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[420px] overflow-y-auto custom-scrollbar p-2">
            {/* 🏫 Universities Section */}
            {results.universities.length > 0 && (
              <div className="mb-2">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <School className="w-3 h-3" /> Их сургуулиуд
                </div>
                {results.universities.map((u) => (
                  <button
                    key={u.id}
                    className="w-full p-2.5 flex items-start gap-3 hover:bg-sky-50 dark:hover:bg-sky-500/10 rounded-xl text-left transition-all group"
                    onClick={() => {
                      setQuery(u.name);
                      setShowDropdown(false);
                      router.push(`/detail/${u.id}`);
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500 transition-colors">
                      <GraduationCap className="w-5 h-5 text-sky-500 group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 truncate leading-snug">{u.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {u.city || 'Улаанбаатар'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* 🎓 Majors Section */}
            {results.majors.length > 0 && (
              <div>
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Мэргэжлийн чиглэл
                </div>

                {results.majors.map((m) => (
                  <button
                    key={m.id}
                    className="w-full p-2.5 flex items-start gap-3 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl text-left transition-all group"
                    onClick={() => {
                      setQuery(m.name);
                      setShowDropdown(false);
                      router.push(`/detail/${m.id}`);
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 transition-colors">
                      <Sparkles className="w-5 h-5 text-indigo-500 group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate leading-snug">{m.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate uppercase tracking-tighter">{m.universities.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && results.universities.length === 0 && results.majors.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-slate-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Илэрц олдсонгүй</p>
                <p className="text-[11px] text-slate-400">Өөр түлхүүр үгээр хайж үзнэ үү.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

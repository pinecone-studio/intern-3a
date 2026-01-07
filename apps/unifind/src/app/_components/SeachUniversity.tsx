'use client';

import { GraduationCap, Loader2, MapPin, School, Search, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { latinToCyrillic } from '../../lib/latinToCyrillic';
import { SearchResult } from '../../lib/types/type';
import { Input } from '../components/ui/input';

export function SearchUniversity() {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult>({
    universities: [],
    majors: [],
  });
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ---------------- search logic ---------------- */
  useEffect(() => {
    if (!query) {
      setResults({ universities: [], majors: [] });
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/searchuniversity/?query=${encodeURIComponent(query)}`);
        const data: University[] = await res.json();
        setResults(data.map((u) => ({ ...u, displayName: u.name })));
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  /* ---------------- navigate helper ---------------- */
  const goToDetail = (id: number | string) => {
    setShowDropdown(false);
    setQuery('');
    router.push(`/detail/${id}`);
  };

  return (
    <div ref={wrapperRef} className="relative hidden md:block w-64 lg:w-72">
      {/* input */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-sky-500" /> : <Search className={`w-4 h-4 ${query ? 'text-sky-500' : 'text-slate-400'}`} />}
        </div>

        <Input placeholder="Сургууль, мэргэжил хайх..." className="pl-10 pr-10 rounded-xl h-10 bg-slate-100/50 dark:bg-neutral-800/50" value={query} onChange={(e) => setQuery(e.target.value)} />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults({ universities: [], majors: [] });
              setShowDropdown(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-[360px] bg-white dark:bg-neutral-900 border rounded-2xl shadow-xl z-50">
          <div className="max-h-[420px] overflow-y-auto p-2">
            {/* Universities */}
            {results.universities.length > 0 && (
              <div className="mb-2">
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <School className="w-3 h-3" /> Их сургуулиуд
                </div>

                {results.universities.map((u) => (
                  <button key={u.id} onClick={() => goToDetail(u.id)} className="w-full p-2.5 flex gap-3 hover:bg-sky-50 rounded-xl text-left">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{u.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {u.city || 'Улаанбаатар'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Majors */}
            {results.majors.length > 0 && (
              <div>
                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Мэргэжлийн чиглэл
                </div>

                {results.majors.map((m) => (
                  <button key={m.id} onClick={() => goToDetail(m.universities.id)} className="w-full p-2.5 flex gap-3 hover:bg-indigo-50 rounded-xl text-left">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{m.name}</div>
                      <div className="text-xs text-slate-400 uppercase">{m.universities.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!loading && results.universities.length === 0 && results.majors.length === 0 && <div className="py-10 text-center text-sm text-slate-400">Илэрц олдсонгүй</div>}
          </div>
        </div>
      )}
    </div>
  );
}

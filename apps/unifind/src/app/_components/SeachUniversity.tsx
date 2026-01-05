'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';

type University = {
  displayName: string;
  id: number;
  name: string;
  city: string;
};

export function SearchUniversity() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Click outside-д dropdown хаах
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/searchuniversity/?query=${encodeURIComponent(query)}`);
        const data: University[] = await res.json();

        // Англи үг оруулвал Монгол нэртэй filter хийх жишээ
        const filteredData = data.map((u) => ({
          ...u,
          displayName: u.name, // Хэрвээ шаардлагатай бол Mongolian нэрийг map хийж болно
        }));

        setResults(filteredData);
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Skeleton card
  function SkeletonCard() {
    return (
      <Card className="p-2 border rounded-md shadow-sm mb-1">
        <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse mb-2" />
        <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse" />
      </Card>
    );
  }

  return (
    <div ref={wrapperRef} className="relative hidden md:block w-64">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input placeholder="Их сургууль хайх..." className="pl-9 bg-gray-50 border-gray-200" value={query} onChange={(e) => setQuery(e.target.value)} />

      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-64 overflow-auto z-50">
          {loading && [1].map((i) => <SkeletonCard key={i} />)}

          {!loading && results.length === 0 && <div className=" text-gray-500 text-sm h-13 flex justify-center w-full items-center">Тохирох их сургууль олдсонгүй</div>}

          {!loading &&
            results.map((u) => (
              <Card
                key={u.id}
                className="p-3 mb-1 border rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setQuery(u.name);
                  setShowDropdown(false);
                }}
              >
                <p className="font-bold text-gray-800">{u.displayName || u.name}</p>
                <p className="text-sm text-gray-500">{u.city}</p>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

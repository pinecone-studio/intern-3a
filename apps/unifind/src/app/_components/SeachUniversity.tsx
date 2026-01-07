'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
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
        setResults(data.map((u) => ({ ...u, displayName: u.name })));
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
      <Card className="p-2 border-b flex rounded-md last:mb-0[-2] pt-0 dark:bg-neutral-800 animate-pulse mt-1 ">
        <div className="h-3 w-3/4 bg-gray-300 dark:bg-neutral-700 rounded mt-1" />
        <div className="h-2 w-1/2 bg-gray-300 dark:bg-neutral-700 rounded mt-1" />
      </Card>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full md:w-80">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Их сургууль хайх..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-3 py-1.5 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 shadow-sm transition"
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full pt-0 left-0 w-full mt-1 pb-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md shadow-md overflow-auto max-h-60 z-50 text-sm p-2 px-1">
          {loading && [1, 2].map((i) => <SkeletonCard key={i} />)}

          {!loading && results.length === 0 && <div className="text-gray-500 dark:text-gray-400 py-2 text-center mt-2 mb-1">Тохирох их сургууль олдсонгүй</div>}

          {!loading &&
            results.map((u) => (
              <Link key={u.id} href={`/detail/${u.id}`} passHref>
                <Card
                  key={u.id}
                  className="p-2 border-b cursor-pointer mt-1 hover:bg-sky-50 dark:hover:bg-gray-800 transition flex flex-col gap-0.5 rounded-md"
                  onClick={() => {
                    setQuery(u.name);
                    setShowDropdown(false);
                  }}
                >
                  <p className="font-medium text-gray-900 dark:text-white">{u.displayName}</p>
                  <p className="text-gray-500 dark:text-gray-400">{u.city}</p>
                </Card>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

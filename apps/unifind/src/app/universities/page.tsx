'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { FilterSidebar } from '../_components/filter-sidebar';
import { ProgramGrid } from '../_components/program-grid';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UniversitiesPage() {
  const [filters, setFilters] = useState({
    search: '',
    majorNames: [] as string[],
    minScore: 0,
    sortBy: 'name',
  });

  const resetFilters = () => {
    setFilters({
      search: '',
      majorNames: [],
      minScore: 0,
      sortBy: 'name',
    });
  };

  const query = new URLSearchParams({
    search: filters.search,
    majors: filters.majorNames.join(','),
    minScore: filters.minScore.toString(),
    sortBy: filters.sortBy,
  }).toString();
  console.log({ query });

  const { data: programs = [], isLoading } = useSWR(`/api/universities?search=${filters.search}&majorNames=${filters.majorNames.join(',')}`, fetcher);

  console.log({ programs });

  return (
    <div className="min-h-screen bg-[#F8FAFC]  inset-0 bg-linear-to-b from-sky-100 via-sky-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
          <ProgramGrid programs={programs} isLoading={isLoading} filters={filters} setFilters={setFilters} resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
}

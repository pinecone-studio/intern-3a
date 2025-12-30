'use client';
import useSWR from 'swr';
import { University } from '../../lib/types/type';
import { Breadcrumb } from '../_components/breadcrumb';
import { FilterSidebar } from '../_components/filter-sidebar';
import { ProgramGrid } from '../_components/program-grid';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UniversitiesPage() {
  const { data, error, isLoading } = useSWR<University[]>('/api/universities', fetcher);

  if (isLoading) return <p>Уншиж байна...</p>;
  if (error) return <p>Өгөгдөл авахад алдаа гарлаа</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <FilterSidebar />
          <ProgramGrid />
        </div>
      </div>
    </div>
  );
}

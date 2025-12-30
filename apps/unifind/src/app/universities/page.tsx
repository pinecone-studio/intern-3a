'use client';

import { Breadcrumb } from '../_components/breadcrumb';
import { FilterSidebar } from '../_components/filter-sidebar';
import { ProgramGrid } from '../_components/program-grid';

export default function UniversitiesPage() {
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

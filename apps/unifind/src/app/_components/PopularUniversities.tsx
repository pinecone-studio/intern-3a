'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { University } from '../../lib/types/type';
import { Button } from '../components/ui/button';
import UniversityCard from './UniversityCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function PopularUniversities() {
  const { data, error, isLoading } = useSWR<University[]>('/api/universities', fetcher);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Зөвлөсөн их сургуулиуд</h2>
            <p className="text-muted-foreground">Таны профайл болон сонголтоор үндэслэн</p>
          </div>
          <Link href={'/universities'}>
            <Button variant={'outline'}>Бүгдийг үзэх</Button>
          </Link>
        </div>

        {/* Cards / Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isLoading &&
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="animate-pulse flex flex-col gap-2 border rounded-lg p-4 bg-white shadow-sm">
                <div className="h-40 bg-gray-200 rounded-lg" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mt-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />
              </div>
            ))}

          {!isLoading &&
            !error &&
            data
              ?.slice(0, 6)
              .map((uni) => (
                <UniversityCard
                  key={uni.id}
                  id={uni.id}
                  name={uni.name}
                  location={uni.city}
                  image={uni.image || ''}
                  status="open"
                  admissionRate={null}
                  deadline={null}
                  nextCycle={null}
                  minScore={''}
                />
              ))}

          {error && <p className="col-span-full text-red-500">Өгөгдөл авахад алдаа гарлаа</p>}
        </div>

        {/* Load more */}
        <div className="text-center">
          <Link href="/universities">
            <button className="px-8 py-3 border-2 border-slate-300 rounded-lg font-semibold text-foreground hover:bg-slate-50 transition-colors">Бүгдийг үзэх</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

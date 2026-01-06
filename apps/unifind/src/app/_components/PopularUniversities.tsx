'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { University } from '../../lib/types/type';
import { Button } from '../components/ui/button';
import UniversityCard from './UniversityCard';
import { UniversityCardSkeleton } from './UniversityCardSkeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function PopularUniversities() {
  const { data, error, isLoading } = useSWR<University[]>('/api/universities', fetcher);

  return (
    <section className="py-20 pb-6 bg-background">
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
          {isLoading && Array.from({ length: 6 }).map((_, i) => <UniversityCardSkeleton key={i} />)}

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
          <Link href={'/universities'}>
            <Button variant={'outline'}>Бүгдийг үзэх</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

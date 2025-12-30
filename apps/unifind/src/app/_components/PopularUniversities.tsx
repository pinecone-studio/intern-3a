import { universities } from '../../lib/data/universities';
import { Button } from '../components/ui/button';
import UniversityCard from './UniversityCard';

import Link from 'next/link';

export function PopularUniversities() {
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
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {universities.slice(0, 6).map((uni) => (
            <UniversityCard
              key={uni.id}
              id={uni.id}
              name={uni.name}
              location={uni.location}
              image={uni.image}
              status="open"
              minScore={uni.minScore}
              admissionRate={uni.admissionRate}
              deadline={uni.deadline}
              nextCycle={uni.nextCycle}
            />
          ))}
        </div>

        {/* Load more */}
        <div className="text-center">
          <button className="px-8 cursor-pointer py-3 border-2 border-slate-300 rounded-lg font-semibold text-foreground hover:bg-slate-50 transition-colors">Бүгдийг үзэх</button>
        </div>
      </div>
    </section>
  );
}

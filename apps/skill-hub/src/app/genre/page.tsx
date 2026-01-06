import { NewClubType } from '@/lib/utils/types';
import { ArrowUpRight, Layers, MapPin } from 'lucide-react';
import Link from 'next/link';

interface GenrePageProps {
  searchParams: Promise<{
    id?: string;
    name?: string;
  }>;
}

async function getAllClubs() {
  const res = await fetch('http://localhost:3000/api/get-all-clubs', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch clubs');
  }

  return res.json();
}

export default async function GenrePage({ searchParams }: GenrePageProps) {
  const params = await searchParams;
  const category = params.id;

  const result = await getAllClubs();
  const clubs = result.data ?? [];

  const filteredClubs = clubs.filter((club: NewClubType) => club.clubCategoryName === category);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {params.name ?? category} <span className="text-indigo-600 text-lg">({filteredClubs.length})</span>
        </h1>
      </div>

      {filteredClubs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-4">
            <Layers className="h-10 w-10 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-600">Энэ ангилалд одоогоор клуб бүртгэгдээгүй байна.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club: NewClubType) => (
            <Link key={club._id} href={`/club/${club._id}`} className="group relative">
              <div className="h-full overflow-hidden rounded-3xl border border-gray-100 bg-white transition-all duration-300 hover:border-indigo-100 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)]">
                {/* Image Section */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={typeof club.clubImage === 'string' ? club.clubImage : club.clubImage ? URL.createObjectURL(club.clubImage) : '/placeholder.png'}
                    alt={club.clubName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Glassmorphism Badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-800 shadow-sm border border-white/20">
                    <Layers size={13} className="text-indigo-600" />
                    {club.clubCategoryName}
                  </div>

                  {/* Hover Overlay Arrow */}
                  <div className="absolute right-4 bottom-4 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">{club.clubSubCategoryName}</div>
                  </div>

                  <h2 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{club.clubName}</h2>

                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">{club.clubDescription}</p>

                  <div className="mt-4 flex items-center gap-3 border-t pt-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-indigo-500">
                      <MapPin size={16} />
                    </div>
                    <span className="line-clamp-1 text-xs font-medium text-gray-600">{club.clubAddress}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

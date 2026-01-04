import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{
    value?: string;
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const value = params.value?.toLowerCase() ?? '';

  const result = await getAllClubs();
  const clubs = result.data ?? [];

  const filteredClubs = value ? clubs.filter((club: any) => club.clubName.toLowerCase().includes(value)) : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-2 text-2xl font-semibold">“{value}” хайлтын үр дүн</h1>

      <p className="mb-6 text-sm text-gray-500">{filteredClubs.length} үр дүн олдлоо</p>

      {filteredClubs.length === 0 ? (
        <p className="text-sm text-gray-500">Илэрц олдсонгүй</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club: any) => (
            <Link key={club._id} href={`/club/${club._id}`}>
              <div className="rounded-xl border p-4 shadow-sm hover:shadow-md transition">
                <img src={club.clubImage} alt={club.clubName} className="mb-3 h-40 w-full rounded-lg object-cover" />

                <h2 className="text-lg font-medium">{club.clubName}</h2>

                <p className="text-sm text-gray-500">{club.clubSubCategoryName}</p>

                <p className="mt-2 line-clamp-1 text-sm">{club.clubDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

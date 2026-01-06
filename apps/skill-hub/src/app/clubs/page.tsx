'use client';

import { Spinner } from '@intern-3a/shadcn';
import { FilteredClubsForUser } from '../_components';
import { useClub } from '../hook/use-club';

export default function ClubsPage() {
  const { allClubs, isLoading } = useClub();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div>
      <FilteredClubsForUser allClubs={allClubs} />
    </div>
  );
}

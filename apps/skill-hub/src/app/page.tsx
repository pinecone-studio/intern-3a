'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { Spinner } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AllClubsCardScrollAnimation, FilteredClubsForUser, Intro, MainPageUserLocationMap } from './_components';
import { useClub } from './hook/use-club';

export default function Index() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const role = user?.publicMetadata?.role;
  const { allClubs, isLoading } = useClub();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;

    async function checkAndCreateUser() {
      const token = await getToken();

      await fetch('/api/check-create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
    checkAndCreateUser();
  }, [isLoaded, user]);

  useEffect(() => {
    if (!isLoaded || !role) return;

    if (role === 'ADMIN') {
      router.push('/club-admin');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div>
      <Intro />
      {/* <MainPageUserLocationMap allClubs={allClubs} isLoading={isLoading} /> */}
      <AllClubsCardScrollAnimation allClubs={allClubs} isLoading={isLoading} />
      <FilteredClubsForUser allClubs={allClubs} />
    </div>
  );
}

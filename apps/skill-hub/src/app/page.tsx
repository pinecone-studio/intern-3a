'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { Button, Spinner } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AllClubsCardScrollAnimation, ClubFilterSection } from './_components';
// import { FilteredClubs } from './_components/filteredClubs';
import { Intro } from './_components/Intro';

export default function Index() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const role = user?.publicMetadata?.role;
  console.log({ user });
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
      <AllClubsCardScrollAnimation />
      <ClubFilterSection />

      {/* <FilteredClubs /> */}
    </div>
  );
}

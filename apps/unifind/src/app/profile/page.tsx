'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TeamCalendar from '../_components/Teamcalendar';

export default function Page() {
  const { user, isLoaded } = useUser();
  const [mrUserId, setMrUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) router.push('/');
    if (isLoaded && user) {
      (async () => {
        const res = await fetch('/api/mruser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
          }),
        });
        const data = await res.json();
        setMrUserId(data.id);
      })();
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user || !mrUserId) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Таны хувийн календарь {user.lastName}</h1>
      <TeamCalendar userId={mrUserId} />
    </div>
  );
}

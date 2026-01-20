'use client';

import { useUser } from '@clerk/nextjs';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push('/login');
      return;
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}

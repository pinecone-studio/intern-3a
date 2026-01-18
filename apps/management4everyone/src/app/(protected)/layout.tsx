'use client';

import { useUser } from '@clerk/nextjs';
import { SidebarProvider, SidebarTrigger } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClerkHeader } from '../_components/ClerkHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <>
      <ClerkHeader />
      <SidebarProvider className="bg-white" open={open} onOpenChange={setOpen}>
        <main>
          <div>
            {!open && (
              <div className="pt-18 px-4 h-screen border border-[#E4E4E7]">
                <SidebarTrigger className="w-6 h-6" />
              </div>
            )}
          </div>
        </main>

        {children}
      </SidebarProvider>
    </>
  );
}

'use client';

import { useUser } from '@clerk/nextjs';
import { SidebarProvider, SidebarTrigger } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  // ⬅️ sync-г 1 л удаа дуудах
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push('/login');
      return;
    }

    // ✅ user байвал DB sync (1 удаа)
    if (!syncedRef.current) {
      syncUser();
      syncedRef.current = true;
    }
  }, [isLoaded, user, router]);

  async function syncUser() {
    try {
      await fetch('/api/auth/sync-user', {
        method: 'POST',
      });
    } catch (err) {
      console.error('User sync failed', err);
    }
  }

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Header />
      <SidebarProvider className="bg-white" open={open} onOpenChange={setOpen}>
        <HomeSideBar open={open} />

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

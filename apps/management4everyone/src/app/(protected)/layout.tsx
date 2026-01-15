'use client';
import { SidebarProvider, SidebarTrigger } from '@intern-3a/shadcn';
import { useEffect, useState } from 'react';
import HomeSideBar from '../_components/home/HomeSideBar';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import { Header } from '../_components/main/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded && !user) return router.push('/login');
    // if (isLoaded && user) SaveUserInfo();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  //   async function SaveUserInfo() {
  //     if (!user) return;

  //     try {
  //       const payload = {
  //         id: user.id,
  //         email: user.primaryEmailAddress?.emailAddress,
  //         name: user.fullName,
  //         image: user.imageUrl,
  //       };

  //       const res = await axios.post('/api/login', payload);
  //       console.log('Saved user:', res.data);
  //     } catch (err) {
  //       console.error('Error occurred fetching data', err);
  //     }
  //   }

  return (
    <>
      <Header />
      <SidebarProvider className="bg-white" open={open} onOpenChange={setOpen}>
        <HomeSideBar open={open} />
        <main>
          <div>
            {!open ? (
              <div className="pt-18 px-4 h-screen border border-[#E4E4E7]">
                <SidebarTrigger className="w-6 h-6" />
              </div>
            ) : null}
          </div>
        </main>
        {children}
      </SidebarProvider>
    </>
  );
}

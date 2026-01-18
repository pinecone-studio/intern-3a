'use client';
import { House, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export const FooterNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-18 fixed bottom-0 left-0 right-0 flex items-center justify-around bg-card border-t border-border/50 shadow-lg z-50">
      <div className="m-1 bg-white">
        <div
          onClick={() => router.push('/')}
          className={`flex flex-col items-center justify-center h-fit hover:text-[#005295] gap-0 px-5 py-2 cursor-pointer ${pathname === '/' ? 'text-[#005295]' : 'text-[#6d7277]'} hover:bg-accent hover:rounded-xl`}
        >
          <House size={24} />
          <p className="text-xs font-medium">Нүүр</p>
        </div>
      </div>

      <div className="m-1 bg-white">
        <div
          onClick={() => router.push('/my-section')}
          className={`flex flex-col items-center justify-center h-fit hover:text-[#005295] gap-0 px-4 py-2 cursor-pointer ${pathname === '/' ? 'text-[#005295]' : 'text-[#6d7277]'} hover:bg-accent hover:rounded-xl`}
        >
          <User size={24} />
          <span className="text-xs font-medium">Миний</span>
        </div>
      </div>
    </div>
  );
};

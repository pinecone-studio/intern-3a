'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideSidebar = pathname === '/login';

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

'use client';

import type React from 'react';

import { useState } from 'react';
import { Header1 } from '../Header1';
import { AdminSideBar } from './AdminSideBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header1 onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

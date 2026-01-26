'use client';

import type React from 'react';

import { useState } from 'react';
import { Header1 } from '../Header1';
import { EmployeeSideBar } from './EmployeeSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function EmployeeLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/5">
      <EmployeeSideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header1 onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-linear-to-b from-transparent via-background to-background/95 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

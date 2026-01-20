'use client';

import type React from 'react';

import { useState } from 'react';
import { Header1 } from '../Header1';
import { EmployeeSideBar } from './EmployeeSideBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function EmployeeLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <EmployeeSideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header1 onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

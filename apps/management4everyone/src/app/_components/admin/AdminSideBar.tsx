'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Briefcase, Building2, Calendar, ChevronLeft, FileText, LayoutDashboard, Megaphone, Users } from 'lucide-react';

import { Button } from 'libs/shared/shadcn/src';
import { cn } from '../../lib/utils';

const navigation = [
  {
    name: 'Announcements',
    href: '/admin/announcement',
    icon: Megaphone,
  },
  {
    name: 'Dashboard',
    href: '/admin/all-users',
    icon: LayoutDashboard,
  },
  {
    name: 'Employee hiring',
    href: '/admin/permission',
    icon: Users,
  },
  {
    name: 'Departments',
    href: '/admin/departments',
    icon: Building2,
  },
  {
    name: 'Info',
    href: '/admin/info',
    icon: Calendar,
  },
  {
    name: 'Leave Management',
    href: '/admin/leave',
    icon: Briefcase,
  },
  {
    name: 'Attendance Reports',
    href: '/admin/attendance',
    icon: FileText,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSideBar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen border-r border-sidebar-border bg-sidebar shadow-lg transition-all duration-300 lg:sticky lg:block',
          isCollapsed ? 'w-16' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-full flex-col bg-linear-to-b from-sidebar via-sidebar to-sidebar/95">
          {/* Logo Section */}
          <div className="shrink-0 border-b border-sidebar-border/50 bg-linear-to-r from-primary/10 via-primary/5 to-transparent px-4 py-5">
            {!isCollapsed && (
              <Link href="/" className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-lg tracking-tight text-sidebar-foreground">EmployeeMS</span>
                  <span className="text-xs text-sidebar-foreground/60">Admin Panel</span>
                </div>
              </Link>
            )}
            {isCollapsed && (
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                  <Building2 className="h-6 w-6" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
                    'group relative overflow-hidden',
                    isActive
                      ? 'bg-linear-to-r from-primary/90 to-primary/70 text-primary-foreground shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground',
                    isCollapsed && 'justify-center',
                  )}
                >
                  {/* Background gradient on hover */}
                  {!isActive && <div className="absolute inset-0 bg-linear-to-r from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-200" />}
                  <Icon className={cn('h-5 w-5 shrink-0 transition-all duration-200', isActive ? 'scale-110' : 'group-hover:scale-110')} />
                  {!isCollapsed && <span className="relative z-10 transition-all duration-200">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Collapse toggle (desktop only) */}
          <div className="shrink-0 border-t border-sidebar-border/50 bg-linear-to-t from-primary/5 to-transparent p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn('w-full font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all duration-200', isCollapsed && 'justify-center px-2')}
            >
              <ChevronLeft className={cn('h-4 w-4 transition-transform duration-300', isCollapsed && 'rotate-180')} />
              {!isCollapsed && <span className="ml-2">Collapse</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

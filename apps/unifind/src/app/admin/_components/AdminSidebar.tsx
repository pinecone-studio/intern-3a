'use client';

import { cn } from '@/lib/utils';
import { BookOpen, ClipboardCheck, GraduationCap, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    label: 'Удирдлагын самбар',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    label: 'Их сургуулиуд',
    icon: GraduationCap,
    href: '/admin/universities',
  },
  {
    label: 'Мэргэжлүүд',
    icon: BookOpen,
    href: '/admin/majors',
  },
  {
    label: 'Элсэлтийн шаардлага',
    icon: ClipboardCheck,
    href: '/admin/requirements',
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card">
      {/* HEADER */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-lg font-semibold">Их сургуулийн удирдлага</h1>
      </div>

      {/* MENU */}
      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

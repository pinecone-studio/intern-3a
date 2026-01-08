'use client';

import { BookOpen, ClipboardCheck, FileText, Home, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../context/app-context';

const nav = [
  { name: 'Landing', href: '/', icon: Home },
  { name: 'Study Planner', href: '/planner', icon: BookOpen },
  { name: 'Homework Helper', href: '/homework', icon: ClipboardCheck },
  { name: 'Exam & Analysis', href: '/exam', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { track, focus } = useApp();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r">
      {/* Brand */}
      <div className="p-4 border-b">
        <div className="text-lg font-bold">EduPlan</div>

        {/* Current context */}
        {track && (
          <div className="mt-2 text-sm text-gray-500">
            Subject: <span className="font-medium text-gray-700">{track}</span>
          </div>
        )}

        {focus && <div className="mt-1 text-xs text-gray-400 truncate">Focus: {focus.title}</div>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                ${active ? 'bg-gray-100 font-medium' : 'hover:bg-gray-100'}`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 space-y-1 border-t">
        <button className="flex w-full gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <Settings size={16} /> Settings
        </button>
        <button className="flex w-full gap-2 px-3 py-2 rounded hover:bg-gray-100">
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </aside>
  );
}

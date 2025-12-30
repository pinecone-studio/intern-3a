'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { GraduationCap, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function Header() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg text-slate-900">UniFind</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={'/'}>
            <div className="cursor-pointer text-sm text-slate-600 hover:text-slate-900 transition-colors">Нүүр хуудас</div>
          </Link>
          <Link href={'/universities'}>
            <div className="text-sm cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">Их сургуулиуд</div>
          </Link>

          {user && (
            <Link href={'/profile'}>
              <div className="text-sm cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">Миний хуваарь</div>
            </Link>
          )}
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Их сургууль хайх..." className="w-64 pl-9 bg-gray-50 border-gray-200" />
          </div>

          <SignedOut>
            <SignInButton>
              <Button className=" hover:bg-cyan-600 text-white">Бүртгүүлэх</Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Нэвтрэх</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

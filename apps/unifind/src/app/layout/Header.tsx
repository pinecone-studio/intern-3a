'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { GraduationCap, Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchUniversity } from '../_components/SeachUniversity';
import { AnimatedThemeToggler } from '../components/ui/animated-theme-toggler';
import { Button } from '../components/ui/button';

export function Header() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 dark:bg-black/70 dark:border-neutral-800 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex gap-6 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">UniFind</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 font-semibold text-foreground">
            <Link href="/">Нүүр хуудас</Link>
            <Link href="/universities">Их сургуулиуд</Link>
            {user && <Link href="/profile">Миний хуваарь</Link>}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Search – secondary */}
          <SearchUniversity />

          {/* 🔥 Primary action */}
          <Link href="/uni-create">
            <Button size="sm" className="gap-1 bg-sky-500 hover:bg-sky-600 text-white">
              <Plus className="w-4 h-4" />
              Их сургууль үүсгэх
            </Button>
          </Link>

          {/* Theme */}
          <AnimatedThemeToggler className="ml-1" />

          {/* Auth */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Нэвтрэх</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">Бүртгүүлэх</Button>
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

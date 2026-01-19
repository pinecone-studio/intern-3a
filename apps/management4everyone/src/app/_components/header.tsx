'use client';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from 'libs/shared/shadcn/src';
import { Bell, Menu, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, isLoaded } = useUser();

  console.log('user deer yu irj bna', user);

  if (!isLoaded) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="flex-1 flex items-center gap-4">
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="search" placeholder="Search employees, departments..." className="pl-9 bg-muted/50" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Notifications</span>
          </Button>

          <div className="flex items-center gap-3 border-l border-border pl-3 ml-1">
            {/* Нэвтэрсэн үед */}
            <SignedIn>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium leading-none">{user?.fullName || user?.username || 'User'}</p>
                <p className="text-xs text-muted-foreground mt-1">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-9 w-9',
                  },
                }}
              />
            </SignedIn>
            {/* Нэвтрээгүй үед */}
            <SignedOut>
              <SignInButton>
                <Button size="sm">Sign in</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

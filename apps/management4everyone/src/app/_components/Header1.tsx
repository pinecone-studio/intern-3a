'use client';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header1({ onMenuClick }: HeaderProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-linear-to-r from-background to-background/95 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left: Menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10 transition-colors" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Right: Notifications and User */}
        <div className="flex items-center gap-3 ml-auto">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors group">
            <div className="relative">
              <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
            </div>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Divider */}
          <div className="h-6 w-px bg-border/50" />

          {/* User Section */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <div className="hidden md:flex flex-col items-end gap-0.5">
                <p className="text-sm font-medium leading-none text-foreground">{user?.fullName || user?.username || 'User'}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-9 w-9 rounded-lg',
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button size="sm" className="rounded-lg">
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

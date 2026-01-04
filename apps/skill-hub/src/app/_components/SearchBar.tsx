'use client';

import { Input, Popover, PopoverAnchor, PopoverContent, Skeleton } from '@intern-3a/shadcn';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useClub } from '../hook/use-club';
import { SearchBarResults } from './SearchBarResults';

export const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/') {
      setSearchValue('');
    }
  }, [pathname]);
  const { allClubs, isLoading } = useClub();

  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  if (isLoading) return <Skeleton className="w-51 h-9 flex items-center justify-center text-sm">Ачааллаж байна...</Skeleton>;
  if (!allClubs || allClubs.length === 0) return <Skeleton className="w-51 h-9 flex items-center justify-center text-sm">Дата олдсонгүй</Skeleton>;

  const filteredClubs = searchValue.trim().length === 0 ? [] : allClubs.filter((club: any) => club.clubName.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="relative w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            className="
              h-9
              rounded-md border border-input
              bg-background
              focus-within:ring-2 focus-within:ring-primary/20
              focus-within:border-primary
              transition-colors
            "
          >
            <div className="relative h-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchValue}
                placeholder="Клубын нэрээр хайх..."
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);
                  setOpen(value.length > 0);
                }}
                onFocus={() => setOpen(searchValue.length > 0)}
                className="
                  h-9
                  pl-10
                  border-0
                  bg-transparent
                  focus:ring-0
                  focus-visible:ring-0
                "
              />
            </div>
          </div>
        </PopoverAnchor>

        <PopoverContent className="w-90 p-1" onOpenAutoFocus={(e) => e.preventDefault()} onCloseAutoFocus={(e) => e.preventDefault()}>
          {filteredClubs.slice(0, 5).map((club: any) => (
            <div
              key={club._id}
              onClick={() => {
                router.push(`/club/${club._id}`);
                setSearchValue('');
                setOpen(false);
              }}
            >
              <SearchBarResults club={club} />
            </div>
          ))}

          {filteredClubs.length === 0 && <div className="text-sm text-muted-foreground p-2">Илэрц олдсонгүй</div>}

          {filteredClubs.length > 5 && (
            <button
              className="mt-2 px-2 py-1 text-sm text-primary"
              onClick={() => {
                router.push(`/search?value=${searchValue}`);
                setOpen(false);
              }}
            >
              “{searchValue}” бүх үр дүнг харах
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

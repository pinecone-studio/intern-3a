'use client';

import { Input, Popover, PopoverAnchor, PopoverContent } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useClub } from '../hook/use-club';
import { SearchBarResults } from './SearchBarResults';

export const SearchBar = () => {
  const router = useRouter();
  const { allClubs, isLoading } = useClub();

  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  if (isLoading) return <div>Ачааллаж байна...</div>;
  if (!allClubs || allClubs.length === 0) return <div>Дата олдсонгүй</div>;

  const filteredClubs = searchValue.trim().length === 0 ? [] : allClubs.filter((club: any) => club.clubName.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className="relative w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        {/* Anchor the popover to a wrapper so the input remains fully interactive */}
        <PopoverAnchor asChild>
          <div>
            <Input
              value={searchValue}
              placeholder="Клубын нэрээр хайх..."
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                setOpen(value.length > 0);
              }}
              onFocus={() => setOpen(searchValue.length > 0)}
              className="pl-4"
            />
          </div>
        </PopoverAnchor>

        <PopoverContent className="w-90" onOpenAutoFocus={(e) => e.preventDefault()} onCloseAutoFocus={(e) => e.preventDefault()}>
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
              className="mt-2 text-sm text-primary"
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

'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton } from '@intern-3a/shadcn'; // Өөрийн сангийн замаар солиорой
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useClub } from '../hook/use-club';

export const CategoryDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { allClubs, isLoading } = useClub();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    if (pathname === '/') {
      setSelectedCategory('');
    }
  }, [pathname]);

  if (isLoading) {
    return <Skeleton className="w-40 h-9 flex items-center justify-center text-sm">Ачааллаж байна...</Skeleton>;
  }

  if (!allClubs || allClubs.length === 0) {
    return <div className="text-sm text-muted-foreground">Дата олдсонгүй</div>;
  }

  const categories = Array.from(new Set(allClubs.map((club: any) => club.clubCategoryName)));

  const handleValueChange = (value: string) => {
    setSelectedCategory(value);
    router.push(`/genre?id=${value}&name=${value}`);
  };

  return (
    <div className="w-40 h-9 max-w-xs relative bg-white text-black border-0 shadow-md rounded-md">
      <Select value={selectedCategory} onValueChange={handleValueChange}>
        <SelectTrigger className="h-9 w-full">
          <SelectValue placeholder="Ангилал сонгох" className='"data-placeholder:text-muted-foreground"' />
        </SelectTrigger>

        <SelectContent position="popper" sideOffset={6} className="absolute top-[-9] right-[-82] ">
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

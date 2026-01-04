'use client';

import { Skeleton } from '@intern-3a/shadcn';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useClub } from '../hook/use-club';

export const CategoryDropdown = () => {
  // ✅ Hook-ууд дандаа эхэнд
  const router = useRouter();
  const pathname = usePathname();
  const { allClubs, isLoading } = useClub();

  const [selectedCategory, setSelectedCategory] = useState('');

  // ✅ Route өөрчлөгдөхийг ажиглана
  useEffect(() => {
    if (pathname === '/') {
      setSelectedCategory('');
    }
  }, [pathname]);

  // ⛔ Hook-уудын ДАРАА early return хийнэ
  if (isLoading) {
    return <Skeleton className="w-37 h-9 flex items-center justify-center text-sm">Ачааллаж байна...</Skeleton>;
  }

  if (!allClubs || allClubs.length === 0) {
    return <Skeleton className="w-37 h-9 flex items-center justify-center text-sm">Дата олдсонгүй</Skeleton>;
  }

  const categories = Array.from(new Set(allClubs.map((club: any) => club.clubCategoryName)));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    router.push(`/genre?id=${category}&name=${category}`);
  };

  return (
    <div
      className="
        h-9 w-full max-w-xs
        rounded-md border border-input
        bg-background
        focus-within:ring-2 focus-within:ring-primary/20
        focus-within:border-primary
        transition-colors
      "
    >
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="
          h-9 w-full
          bg-transparent
          px-3 text-sm
          outline-none
          border-0
          cursor-pointer
          text-muted-foreground
        "
      >
        <option value="" disabled>
          Ангилал сонгох
        </option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

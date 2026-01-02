'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useClub } from '../hook/use-club';

export const CategoryDropdown = () => {
  const router = useRouter();
  const { allClubs, isLoading } = useClub();

  if (isLoading) {
    return <div>Ачааллаж байна...</div>;
  }

  if (!allClubs || allClubs.length === 0) {
    return <div>Дата олдсонгүй</div>;
  }

  // 1. clubCategoryName-үүдийг unique болгох
  const categories = Array.from(new Set(allClubs.map((club: any) => club.clubCategoryName)));

  // 2. сонголт хийх үед тусдаа page рүү шилжих
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    if (!category) return;

    router.push(`/genre?id=${category}&name=${category}`);
  };

  return (
    <div className="w-full max-w-xs">
      <select defaultValue="" onChange={handleChange} className="w-full rounded-md border px-3 py-2 text-sm">
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

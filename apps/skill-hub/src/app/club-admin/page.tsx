'use client';

import React, { useEffect, useState } from 'react';
import { useClub } from '../hook/use-club';
import { ClubCard } from './_components';

const ClubAdminPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { allClubs = [] } = useClub();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="min-h-screen py-12">
      {isLoading ? (
        <div className="flex flex-wrap gap-6">
          {Array.from({ length: 1 }).map((_, idx) => (
            <div key={idx} className="p-4 border rounded-md shadow-sm mb-2 space-y-2 w-80">
              <div className="h-36 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-full bg-slate-200 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Дугуйлангийн нэгдсэн бүртгэл</h1>
            <p className="mt-2 text-sm text-gray-600">Нэг дор дугуйлан, багш, хуваарь болон бүртгэлийг хянах самбар.</p>
          </div>

          <section aria-labelledby="clubs-heading">
            <h2 id="clubs-heading" className="sr-only">
              Clubs
            </h2>
            <div className="flex flex-wrap gap-6">
              {allClubs.map((club) => (
                <ClubCard key={club._id} club={club} />
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default ClubAdminPage;

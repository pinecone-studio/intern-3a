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
        <div className="flex flex-wrap gap-6 animate-pulse px-5">
          {/* Header Skeleton */}
          <div className="w-full mb-8">
            <div className="h-10 w-130 bg-gray-300 rounded-md mb-3" />
            <div className="h-4 w-120 bg-gray-200 rounded-md" />
          </div>

          {/* Cards Skeleton */}
          {Array.from({ length: 20 }).map((_, idx) => (
            <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
              <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col h-full">
                <div className="aspect-video bg-slate-200 w-full" />
                <div className="p-6 flex flex-col grow space-y-4">
                  <div className="h-6 w-3/4 bg-slate-200 rounded" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-200 rounded" />
                    <div className="h-3 w-5/6 bg-slate-200 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-200 rounded-full" />
                    <div className="h-6 w-16 bg-slate-200 rounded-full" />
                    <div className="h-6 w-16 bg-slate-200 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200" />
                      <div className="w-10 h-10 rounded-full bg-slate-200" />
                      <div className="w-10 h-10 rounded-full bg-slate-200" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="h-10 w-full bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
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

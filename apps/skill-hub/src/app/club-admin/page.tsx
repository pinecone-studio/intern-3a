'use client';

import React from 'react';
import { useClub } from '../hook/use-club';
import { ClubCard } from './_components';

const ClubAdminPage = () => {
  const { allClubs } = useClub();
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Дугуйлангийн нэгдсэн бүртгэл</h1>
          <p className="mt-2 text-sm text-gray-600">Нэг дор дугуйлан, багш, хуваарь болон бүртгэлийг хянах самбар.</p>
        </div>

        <section aria-labelledby="clubs-heading">
          <h2 id="clubs-heading" className="sr-only">
            Clubs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allClubs.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ClubAdminPage;

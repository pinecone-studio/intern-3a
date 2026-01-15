'use client';

import { Footer } from './_components/Footer';
import { Header } from './_components/Header';
import { Jobs } from './_components/Jobs';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <Jobs />
      <Footer />
    </div>
  );
}

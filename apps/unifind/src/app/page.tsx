'use client';

import { CallToAction } from './_components/CallToAction';
import { HeroSection } from './_components/HeroSection';
import { PopularUniversities } from './_components/PopularUniversities';
import { SearchCard } from './_components/SearchCard';

import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn } = useUser(); // 👈 Detect login status

  return (
    <div>
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 -mt-20 relative z-10 ">
          <SearchCard />
        </div>
        <PopularUniversities />

        {/* Show CallToAction ONLY if user is NOT signed in */}
        {!isSignedIn && <CallToAction />}
      </main>
    </div>
  );
}

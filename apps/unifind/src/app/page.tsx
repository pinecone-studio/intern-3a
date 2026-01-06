import { CallToAction } from './_components/CallToAction';
import { HeroSection } from './_components/HeroSection';

import { PopularUniversities } from './_components/PopularUniversities';
import { SearchCard } from './_components/SearchCard';

export default function Home() {
  return (
    <div>
      {/* <Header></Header> */}
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 -mt-20 relative z-10 ">
          <SearchCard />
        </div>
        <PopularUniversities />
        <CallToAction />
      </main>
    </div>
  );
}

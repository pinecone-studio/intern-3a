import { Button } from '@intern-3a/shadcn';
import { AllClubsCardScrollAnimation, ClubFilterSection } from './_components';
import { FilteredClubs } from './_components/filteredClubs';
import { Intro } from './_components/Intro';
import Map from './_components/Map';

export default function Index() {
  return (
    <div>
      <Button variant="destructive">Hello</Button>
      <Intro />
      <AllClubsCardScrollAnimation />
      <ClubFilterSection />

      <FilteredClubs />
      <Map />
    </div>
  );
}

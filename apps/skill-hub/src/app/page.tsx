import { Button } from '@intern-3a/shadcn';
import { AllClubsCardScrollAnimation, ClubFilterSection } from './_components';
// import { FilteredClubs } from './_components/filteredClubs';
import { Intro } from './_components/Intro';

export default function Index() {
  return (
    <div>
      <Button variant="destructive">Hello</Button>
      <Intro />
      <AllClubsCardScrollAnimation />
      <ClubFilterSection />

      {/* <FilteredClubs /> */}
    </div>
  );
}

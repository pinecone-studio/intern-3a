import { AllClubsCardScrollAnimation, ClubFilterSection } from './_components';
// import { FilteredClubs } from './_components/filteredClubs';
import { Intro } from './_components/Intro';

export default function Index() {
  return (
    <div>
      <Intro />
      <AllClubsCardScrollAnimation />
      <ClubFilterSection />

      {/* <FilteredClubs /> */}
    </div>
  );
}

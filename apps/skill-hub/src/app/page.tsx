import { Button } from '@intern-3a/shadcn';
import { AllClubsCardScrollAnimation } from './_components';
import { Intro } from './_components/Intro';
import Map from './_components/Map';
import { FilteredClubs } from './_components/FilteredClubs';

export default function Index() {
  return (
    <div>
      <Button variant="destructive">Hello</Button>
      <Intro />
      <AllClubsCardScrollAnimation />

      <FilteredClubs />
      <Map />
    </div>
  );
}

import { Button } from '@intern-3a/shadcn';
import { Intro } from './_components/Intro';
import { FilteredClubs } from './_components/filteredClubs';

export default function Index() {
  return (
    <div>
      <Button variant="destructive">Hello</Button>
      <Intro />
      <FilteredClubs />
    </div>
  );
}

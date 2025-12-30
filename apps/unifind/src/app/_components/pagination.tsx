import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button className="w-9 h-9 bg-blue-600 hover:bg-blue-700">1</Button>
      <Button variant="ghost" className="w-9 h-9">
        2
      </Button>
      <Button variant="ghost" className="w-9 h-9">
        3
      </Button>
      <Button variant="ghost" className="w-9 h-9">
        ...
      </Button>
      <Button variant="ghost" className="w-9 h-9">
        8
      </Button>
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

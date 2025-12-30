import { ChevronDown, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';

export function SearchCard() {
  return (
    <Card className="bg-white shadow-2xl rounded-xl p-8 max-w-5xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Их сургуулиуд</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Нэрээр нь хайх ..." className="pl-10 h-12 bg-slate-50 border-slate-200" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Мэргэжлүүд</label>
          <div className="relative">
            <Input placeholder="Сэтгэл зүйч .... " className="h-12 bg-slate-50 border-slate-200 pr-10" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Босго оноогоор нь</label>
          <Input placeholder="500" type="number" className="h-12 bg-slate-50 border-slate-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Жил</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input defaultValue="2026" className="h-12 bg-slate-50 border-slate-200 pr-10" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button size="lg" className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white h-12 px-8">
              <Search className="h-4 w-4 " />
              Хайх
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

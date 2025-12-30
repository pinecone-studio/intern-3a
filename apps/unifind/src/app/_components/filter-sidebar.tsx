'use client';

import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';

export function FilterSidebar() {
  const [fieldExpanded, setFieldExpanded] = useState(true);
  const [scoreValue, setScoreValue] = useState([650]);

  return (
    <aside className="bg-white rounded-lg p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Шүүлтүүр</h2>
        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium">
          Шүүлтүүр цэвэрлэх
        </Button>
      </div>

      {/* Хайлт */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Нэрээр хайх..." className="pl-10 bg-gray-50 border-gray-200" />
        </div>
      </div>

      {/* Мэргэжлийн чиглэл */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <button onClick={() => setFieldExpanded(!fieldExpanded)} className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-sm">Мэргэжлийн чиглэл</h3>
          {fieldExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {fieldExpanded && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="engineering" />
              <Label htmlFor="engineering" className="text-sm text-gray-700 cursor-pointer">
                Инженер & Технологи
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="medicine" />
              <Label htmlFor="medicine" className="text-sm text-gray-700 cursor-pointer">
                Анагаах ухаан & Эрүүл мэнд
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="business" defaultChecked />
              <Label htmlFor="business" className="text-sm text-gray-700 cursor-pointer">
                Бизнес & Менежмент
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="arts" />
              <Label htmlFor="arts" className="text-sm text-gray-700 cursor-pointer">
                Урлаг & Хүмүүнлэг
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Доод онооны шаардлага */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-sm">Хамгийн бага оноо</h3>
          <ChevronUp className="w-4 h-4 text-gray-400" />
        </div>

        <div className="space-y-4">
          <Slider value={scoreValue} onValueChange={setScoreValue} max={1000} step={10} className="w-full" />
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>0</span>
            <span className="font-semibold text-blue-600">{scoreValue[0]}+</span>
            <span>1000</span>
          </div>
        </div>
      </div>

      {/* Элсэлтийн жил */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-sm">Элсэлтийн жил</h3>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Зөвлөгөө хэрэгтэй юу */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-2">Зөвлөгөө хэрэгтэй юу?</h3>
        <p className="text-xs text-gray-600 mb-3">Манай зөвлөхүүдтэй холбогдож өөрт тохирох сургуулиа олоорой.</p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Одоо чатлах</Button>
      </div>
    </aside>
  );
}

import { ArrowRight, MapPin } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { University } from '../../lib/types/type';
import { Button } from '../components/ui/button';

export function ProgramCard({ program }: { program: University }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {/* <Image src={program.image || '/placeholder.svg'} alt={program.name} fill className="object-cover" /> */}
        <div className="absolute top-3 right-3">
          {/* <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${program.type === 'Public' ? 'bg-white text-green-700' : 'bg-white text-purple-700'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${program.type === 'Public' ? 'bg-green-700' : 'bg-purple-700'}`} />
            {program.type}
          </span> */}
        </div>
        {/* <div className="absolute bottom-3 left-3">
          <div className="w-14 h-14 bg-teal-700 rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 bg-white/20 rounded" />
          </div>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-balance">{program.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{program.city}</span>
        </div>
        {/* Tags */}
        {/* <div className="flex items-center gap-2 mb-4 flex-wrap">
          {program.map((tag, index) => (
            <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
              {tag}
            </span>
          ))}
        </div> */}
        {/* Score & Deadline */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs uppercase mb-1">Min Score</div>
            {/* <div className="font-bold">
              {program.minScore}
              {program.maxScore && <span className="text-gray-400 font-normal"> / {program.maxScore}</span>}
            </div> */}
          </div>
          <div className="text-right">
            <div className="text-gray-500 text-xs uppercase mb-1">Deadline</div>
            {/* <div className={`font-bold ${program.deadlineColor}`}>{program.deadline}</div> */}
          </div>
        </div>
        {/* CTA Button */}{' '}
        <Button onClick={() => router.push(`/detail/${program.id}`)} className="w-full bg-blue-600 hover:bg-blue-700 group">
          Дэлгэрэнгүй
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

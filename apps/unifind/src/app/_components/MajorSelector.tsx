import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../components/ui/input';

export default function MajorSelector({ filteredMajors }: { filteredMajors: { id: string; name: string }[] }) {
  const [majorQuery, setMajorQuery] = useState('');
  const [, setSelectedMajor] = useState<string | null>(null);
  const [showMajor, setShowMajor] = useState(false);

  // ✅ TypeScript-д зориулж төрөл заав
  const majorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (majorRef.current && !majorRef.current.contains(event.target as Node)) {
        setShowMajor(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={majorRef} className="relative w-full">
      <Input
        className="h-12 cursor-pointer"
        placeholder="Мэргэжил (optional)"
        value={majorQuery}
        onFocus={() => setShowMajor(true)}
        onChange={(e) => {
          setMajorQuery(e.target.value);
          setSelectedMajor(null);
          setShowMajor(true);
        }}
      />
      <ChevronDown className="absolute right-3 top-3 text-gray-400" />

      {showMajor && filteredMajors.length > 0 && (
        <div className="absolute z-[100] mt-1 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-h-56 overflow-auto">
          {filteredMajors.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                setMajorQuery(m.name);
                setSelectedMajor(m.id);
                setShowMajor(false);
              }}
              className="px-3 py-2 z-[100] cursor-pointer text-sm hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {m.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

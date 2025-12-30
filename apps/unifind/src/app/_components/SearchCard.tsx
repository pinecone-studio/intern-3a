'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';

const SUBJECTS = [
  { id: 1, name: 'Математик' },
  { id: 2, name: 'Англи хэл' },
  { id: 3, name: 'Физик' },
  { id: 4, name: 'Хими' },
];

export function SearchCard() {
  const [majors, setMajors] = useState<any[]>([]);
  const [majorQuery, setMajorQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);

  const [subject1, setSubject1] = useState<number | null>(null);
  const [score1, setScore1] = useState('');
  const [subject2, setSubject2] = useState<number | null>(null);
  const [score2, setScore2] = useState('');

  const [results, setResults] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/majors')
      .then((res) => res.json())
      .then(setMajors);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowMajorDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSearch() {
    const scores: any[] = [];

    if (subject1 && score1) {
      scores.push({ subject_id: subject1, score: Number(score1) });
    }
    if (subject2 && score2) {
      scores.push({ subject_id: subject2, score: Number(score2) });
    }

    if (scores.length === 0) {
      alert('Ядаж 1 хичээлийн оноо оруулна уу');
      return;
    }

    const res = await fetch('/api/check-admission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        major_id: selectedMajor,
        scores,
      }),
    });

    const data = await res.json();
    setResults(data);
  }

  const filteredMajors = majors.filter((m) => m.name.toLowerCase().includes(majorQuery.toLowerCase()));

  return (
    <div className="relative">
      <Card ref={wrapperRef} className="relative p-8 max-w-5xl mx-auto mt-10 z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Input
              placeholder="Мэргэжил (optional)"
              value={majorQuery}
              onFocus={() => setShowMajorDropdown(true)}
              onChange={(e) => {
                setMajorQuery(e.target.value);
                setSelectedMajor(null);
                setShowMajorDropdown(true);
              }}
              className="h-12"
            />

            {showMajorDropdown && majorQuery && (
              <div className="absolute top-full left-0 z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-56 overflow-auto">
                {filteredMajors.slice(0, 6).map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setMajorQuery(m.name);
                      setSelectedMajor(m.id);
                      setShowMajorDropdown(false);
                    }}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-100"
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <select className="h-12 w-full rounded-md border bg-slate-50 px-3 text-sm" value={subject1 ?? ''} onChange={(e) => setSubject1(Number(e.target.value))}>
              <option value="" disabled>
                Хичээл 1
              </option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <Input className="mt-2 h-12" placeholder="Оноо" type="number" min={0} max={800} value={score1} onChange={(e) => setScore1(e.target.value)} />
          </div>

          <div>
            <select className="h-12 w-full rounded-md border bg-slate-50 px-3 text-sm" value={subject2 ?? ''} onChange={(e) => setSubject2(Number(e.target.value))}>
              <option value="" disabled>
                Хичээл 2
              </option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <Input className="mt-2 h-12" placeholder="Оноо" type="number" min={0} max={800} value={score2} onChange={(e) => setScore2(e.target.value)} />
          </div>

          <Button onClick={handleSearch} className="h-12 bg-cyan-500 hover:bg-cyan-600 text-white">
            <Search className="w-4 h-4 mr-2" />
            Хайх
          </Button>
        </div>

        {/* ================= RESULT (POP, NOT PUSH) ================= */}
        {results.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-4 z-30">
            <Card className="p-4 shadow-xl">
              <div className="grid gap-3">
                {results.map((m) => (
                  <div key={m.id} className="flex justify-between items-center rounded-lg border p-3 hover:bg-slate-50">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-muted-foreground">{m.universities.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}

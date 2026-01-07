'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import MajorSelector from './MajorSelector';

const SUBJECTS = [
  { id: 1, name: 'Математик' },
  { id: 2, name: 'Англи хэл' },
  { id: 3, name: 'Монгол Хэл' },
  { id: 4, name: 'Физик' },
  { id: 5, name: 'Хими' },
  { id: 6, name: 'Мэдээлэл зүй' },
];

export function SearchCard() {
  const router = useRouter();

  const [majors, setMajors] = useState<any[]>([]);
  const [majorQuery, setMajorQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const [showMajor, setShowMajor] = useState(false);

  const [subject1, setSubject1] = useState<number | null>(null);
  const [subject2, setSubject2] = useState<number | null>(null);
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const [score1Error, setScore1Error] = useState('');
  const [score2Error, setScore2Error] = useState('');
  const [showSub1, setShowSub1] = useState(false);
  const [showSub2, setShowSub2] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const majorRef = useRef<HTMLDivElement>(null);
  const sub1Ref = useRef<HTMLDivElement>(null);
  const sub2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/majors')
      .then((res) => res.json())
      .then(setMajors);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (majorRef.current && !majorRef.current.contains(e.target as Node)) setShowMajor(false);
      if (sub1Ref.current && !sub1Ref.current.contains(e.target as Node)) setShowSub1(false);
      if (sub2Ref.current && !sub2Ref.current.contains(e.target as Node)) setShowSub2(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSearch() {
    const scores: any[] = [];
    if (subject1 && score1) scores.push({ subject_id: subject1, score: Number(score1) });
    if (subject2 && score2) scores.push({ subject_id: subject2, score: Number(score2) });

    if (!scores.length) {
      alert('Ядаж 1 хичээлийн оноо оруулна уу');
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch('/api/check-admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ major_id: selectedMajor, scores }),
      });
      setResults(await res.json());
    } finally {
      setLoading(false);
    }
  }

  const filteredMajors = majors.filter((m) => m.name.toLowerCase().includes(majorQuery.toLowerCase()));

  return (
    <div className="relative">
      <Card className="p-8 max-w-5xl mx-auto mt-10 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* MAJOR POPOVER */}
          <MajorSelector filteredMajors={filteredMajors} />

          {/* SUBJECT 1 */}
          <div ref={sub1Ref} className="relative">
            <Button variant="outline" className="h-12 w-full justify-between" onClick={() => setShowSub1(!showSub1)}>
              {SUBJECTS.find((s) => s.id === subject1)?.name ?? 'Хичээл 1'}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>

            {showSub1 && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                {SUBJECTS.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSubject1(s.id);
                      setShowSub1(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-sm hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg ${subject2 === s.id ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-row justify-center">
              <Input
                className="mt-2 h-12"
                placeholder="Оноо"
                type="number"
                value={score1}
                onChange={(e) => {
                  const val = e.target.value;
                  setScore1(val);
                  if (val && Number(val) > 800) {
                    setScore1Error('800 онооноос доош утга оруулна уу');
                  } else {
                    setScore1Error('');
                  }
                }}
              />
              {score1Error && <p className="flex absolute text-red-500 text-[12px] justify-center mt-15">{score1Error}</p>}
            </div>
          </div>

          {/* SUBJECT 2 */}
          <div ref={sub2Ref} className="relative">
            <Button variant="outline" className="h-12 w-full justify-between" onClick={() => setShowSub2(!showSub2)}>
              {SUBJECTS.find((s) => s.id === subject2)?.name ?? 'Хичээл 2'}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>

            {showSub2 && (
              <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                {SUBJECTS.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSubject2(s.id);
                      setShowSub2(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-sm hover:bg-slate-100 dark:hover:bg-gray-700 ${subject1 === s.id ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center flex-row">
              <Input
                className="mt-2 h-12"
                placeholder="Оноо"
                type="number"
                value={score2}
                onChange={(e) => {
                  const val = e.target.value;
                  setScore2(val);
                  if (val && Number(val) > 800) {
                    setScore2Error('800 онооноос доош утга оруулна уу');
                  } else {
                    setScore2Error('');
                  }
                }}
              />
              {score2Error && <p className="flex  absolute text-red-500 text-[12px] justify-center mt-15">{score2Error}</p>}
            </div>
          </div>

          <Button onClick={handleSearch} className="h-12 bg-sky-500 hover:bg-sky-600 text-white">
            <Search className="w-4 h-4" />
            Хайх
          </Button>
        </div>

        {/* RESULTS */}
        {loading && (
          <div className="mt-6 space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-slate-100 dark:bg-gray-800" />
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="mt-6 grid gap-4">
            {results
              .sort((a, b) => {
                if (a.allRequirementsMet && !b.allRequirementsMet) return -1;
                if (!a.allRequirementsMet && b.allRequirementsMet) return 1;
                return (b.scholarshipPercent ?? 0) - (a.scholarshipPercent ?? 0);
              })
              .map((m, idx) => {
                const passed = m.allRequirementsMet;

                return (
                  <div
                    key={idx}
                    onClick={() => passed && router.push(`/mergejil/${m.majorid}`)}
                    className={`relative rounded-xl border p-5 transition-all ${
                      passed ? 'bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : 'bg-slate-50 dark:bg-gray-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* STATUS BADGE */}
                    <div className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {passed ? 'Тэнцсэн' : 'Тэнцээгүй'}
                    </div>

                    {/* HEADER */}
                    <div className="space-y-1">
                      <p className="text-lg font-semibold">{m.major}</p>
                      <p className="text-sm text-gray-500">{m.university}</p>
                    </div>

                    {/* REQUIREMENTS */}
                    {m.requirements?.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {m.requirements.map((r: any, i: number) => (
                          <div key={i} className={`flex justify-between text-sm ${r.meets ? 'text-green-600' : 'text-red-500'}`}>
                            <span>{r.subject}</span>
                            <span>
                              {r.userScore} / {r.minScore}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* SCHOLARSHIP */}
                    {passed && m.scholarshipPercent > 0 && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-500">🎓 {m.scholarshipPercent}% тэтгэлэг</div>
                    )}
                  </div>
                );
              })}
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && <p className="mt-6 text-center text-gray-500">Тохирох мэргэжил олдсонгүй</p>}
      </Card>
    </div>
  );
}

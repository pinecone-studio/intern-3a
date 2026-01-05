'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';

const SUBJECTS = [
  { id: 1, name: 'Математик' },
  { id: 2, name: 'Англи хэл' },
  { id: 3, name: 'Монгол Хэл' },
  { id: 4, name: 'Физик' },
  { id: 5, name: 'Хими' },
  { id: 6, name: 'Мэдээлэл зүй' },
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
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    if (subject1 && score1) scores.push({ subject_id: subject1, score: Number(score1) });
    if (subject2 && score2) scores.push({ subject_id: subject2, score: Number(score2) });

    if (scores.length === 0) {
      alert('Ядаж 1 хичээлийн оноо оруулна уу');
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch('/api/check-admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ major_id: selectedMajor, scores }),
      });
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  }

  function ResultSkeleton() {
    return (
      <Card className="p-4 shadow-xl">
        <div className="grid gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center rounded-lg border p-3">
              <div className="space-y-2 w-full">
                <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-1/3 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  const filteredMajors = majors.filter((m) => m.name.toLowerCase().includes(majorQuery.toLowerCase()));
  console.log({ results });

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

          <Button onClick={handleSearch} className="h-12 bg-sky-600 hover:bg-sky-700 text-white">
            <Search className="w-4 h-4 mr-2" />
            Хайх
          </Button>
        </div>
        {/* ================= RESULT ================= */}
        {loading && <ResultSkeleton />}
        {/* // ================= RESULT ================= */}
        {!loading && results.length > 0 && (
          <Card className="p-4 shadow-xl">
            <div className="grid gap-3">
              {results
                .sort((a, b) => {
                  // 1. allRequirementsMet-ийг эхэнд
                  if (a.allRequirementsMet && !b.allRequirementsMet) return -1;
                  if (!a.allRequirementsMet && b.allRequirementsMet) return 1;

                  // 2. scholarshipPercent ихээс бага
                  return (b.scholarshipPercent ?? 0) - (a.scholarshipPercent ?? 0);
                })
                .map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border rounded-lg mb-3 ${m.allRequirementsMet ? 'bg-white hover:bg-slate-50 cursor-pointer' : 'bg-gray-100 opacity-50 cursor-not-allowed'}`}
                    onClick={() => m.allRequirementsMet && router.push(`/mergejil/${m.majorid}`)}
                  >
                    <p className="font-semibold text-lg">{m.major}</p>
                    <p className="text-sm text-gray-600">{m.university}</p>

                    {/* Шаардлагын оноонууд */}
                    {m.requirements.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {m.requirements.map((r: any, i: number) => (
                          <p key={i} className={r.meets ? 'text-green-600' : 'text-red-500'}>
                            {r.subject}: {r.userScore} / {r.minScore}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Тэтгэлэг */}
                    {m.scholarshipPercent > 0 && <p className="mt-2 text-blue-600 font-medium">Таны боломжит тэтгэлэг: {m.scholarshipPercent}% төлбөрийн хөнгөлөлт</p>}
                  </div>
                ))}

              {!loading && results.length === 0 && <p className="text-center text-muted-foreground mt-4">Тохирох мэргэжил олдсонгүй</p>}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}

'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
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
  const router = useRouter();

  const [majors, setMajors] = useState<{ id: number; name: string }[]>([]);
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
      .then(setMajors)
      .catch(() => setMajors([]));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      // major dropdown
      if (majorRef.current && !majorRef.current.contains(target)) {
        setShowMajor(false);
      }

      // sub1 dropdown
      if (sub1Ref.current && !sub1Ref.current.contains(target)) {
        setShowSub1(false);
      }

      // sub2 dropdown
      if (sub2Ref.current && !sub2Ref.current.contains(target)) {
        setShowSub2(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSearch() {
    const scores: { subject_id: number; score: number }[] = [];
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
    <div className="w-full max-w-5xl mx-auto px-4 mt-10 relative z-0">
      {/* Compact search bar */}
      <div className="bg-card/90 dark:bg-gray-900 backdrop-blur-md border border-border rounded-2xl p-3 shadow-x px-3 z-10 relative">
        <div className="flex flex-wrap items-center gap-2 lg:gap-2">
          {/* Major selector */}
          <div ref={majorRef} className="flex-1 min-w-35 relative">
            <Input
              className="h-11 rounded-xl border-0 bg-accent/50 pl-4 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-sky-500"
              placeholder="Мэргэжил"
              value={majorQuery}
              onFocus={() => setShowMajor(true)}
              onChange={(e) => {
                setMajorQuery(e.target.value);
                setSelectedMajor(null);
              }}
            />
            <ChevronDown
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform ${showMajor ? 'rotate-180' : ''}`}
              onClick={() => setShowMajor((prev) => !prev)}
            />

            {/* Dropdown */}
            {showMajor && filteredMajors.length > 0 && (
              <div className="absolute mt-2 w-full dark:bg-[#1c2232] bg-popover border border-border rounded-xl shadow-xl z-1000">
                <div className="max-h-48 overflow-y-auto p-1">
                  {filteredMajors.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        setMajorQuery(m.name);
                        setSelectedMajor(m.id);
                        setShowMajor(false);
                      }}
                      className="px-3 py-2 cursor-pointer text-sm hover:bg-accent dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      {m.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subject 1 */}
          <div className="flex items-center gap-2 flex-1 min-w-45 relative">
            <div ref={sub1Ref} className="flex-1 relative">
              <button
                onClick={() => setShowSub1(!showSub1)}
                className="h-11 w-full px-3 flex items-center dark:bg-[#1c2232] justify-between gap-1 text-sm bg-accent/50 hover:bg-accent rounded-xl transition-colors"
              >
                <span className={subject1 ? 'text-foreground' : 'text-muted-foreground'}>{SUBJECTS.find((s) => s.id === subject1)?.name ?? 'Хичээл 1'}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showSub1 ? 'rotate-180' : ''}`} />
              </button>
              {showSub1 && (
                <div className="absolute mt-2 w-full dark:bg-[#1c2232] bg-popover border border-border rounded-xl shadow-xl z-1000">
                  <div className="p-1">
                    {SUBJECTS.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSubject1(s.id);
                          setShowSub1(false);
                        }}
                        className={`px-3 py-2 dark:hover:bg-gray-800 cursor-pointer text-sm hover:bg-accent rounded-lg transition-colors ${subject2 === s.id ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Input
              className={`h-11 w-20 rounded-xl border-0 bg-accent/50 text-sm text-center  focus-visible:ring-1 focus-visible:ring-sky-500 ${score1Error ? 'text-destructive' : ''}`}
              placeholder="Оноо"
              type="number"
              value={score1}
              onChange={(e) => {
                const val = e.target.value;
                setScore1(val);
                setScore1Error(val && Number(val) > 800 ? 'Max 800' : '');
              }}
            />
          </div>

          {/* Subject 2 */}
          <div className="flex items-center gap-2 flex-1 min-w-45 relative">
            <div ref={sub2Ref} className="flex-1 relative">
              <button
                onClick={() => setShowSub2(!showSub2)}
                className="h-11 w-full px-3 flex items-center dark:bg-[#1c2232] justify-between gap-1 text-sm bg-accent/50 hover:bg-accent rounded-xl transition-colors"
              >
                <span className={subject2 ? 'text-foreground' : 'text-muted-foreground'}>{SUBJECTS.find((s) => s.id === subject2)?.name ?? 'Хичээл 2'}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showSub2 ? 'rotate-180' : ''}`} />
              </button>
              {showSub2 && (
                <div className="absolute mt-2 w-full dark:bg-[#1c2232] bg-popover border border-border rounded-xl shadow-xl z-1000">
                  <div className="p-1">
                    {SUBJECTS.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSubject2(s.id);
                          setShowSub2(false);
                        }}
                        className={`px-3 py-2 dark:hover:bg-gray-800 cursor-pointer text-sm hover:bg-accent rounded-lg transition-colors ${subject1 === s.id ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Input
              className={`h-11 w-20 rounded-xl border-0 bg-accent/50 text-sm text-center focus-visible:ring-1 focus-visible:ring-sky-500 ${score2Error ? 'text-destructive' : ''}`}
              placeholder="Оноо"
              type="number"
              value={score2}
              onChange={(e) => {
                const val = e.target.value;
                setScore2(val);
                setScore2Error(val && Number(val) > 800 ? 'Max 800' : '');
              }}
            />
          </div>

          {/* Search button */}
          <Button onClick={handleSearch} disabled={loading} className="h-11 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shrink-0">
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Хайх
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="mt-4 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl">
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="mt-4 bg-card/90 backdrop-blur-md border border-border z-0 rounded-2xl p-4 shadow-xl max-h-100 overflow-y-auto dark:bg-gray-900">
          <div className="grid gap-3">
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
                    className={`rounded-xl border p-4 transition-all ${
                      passed ? 'bg-card hover:shadow-lg hover:-translate-y-0.5 cursor-pointer dark:bg-[#1c2232] border-green-200 dark:border-green-900' : 'bg-muted/50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Status badge */}
                    <div
                      className={` px-2 py-1 text-xs font-semibold w-17 rounded-full ${
                        passed ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                      }`}
                    >
                      {passed ? 'Тэнцсэн' : 'Тэнцээгүй'}
                    </div>
                    <div className="pr-20">
                      <p className="font-semibold text-foreground">{m.major}</p>
                      <p className="text-sm text-muted-foreground">{m.university}</p>
                    </div>
                    {m.requirements?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.requirements.map((r: any, i: number) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded-md ${
                              r.meets ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}
                          >
                            {r.subject}: {r.userScore}/{r.minScore}
                          </span>
                        ))}
                      </div>
                    )}
                    {passed && m.scholarshipPercent > 0 && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-sky-100 dark:bg-sky-900/30 px-2 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                        🎓 {m.scholarshipPercent}% тэтгэлэг
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <div className="mt-4 bg-card/90 backdrop-blur-md border border-border rounded-2xl p-6 shadow-xl text-center">
          <p className="text-muted-foreground">Тохирох мэргэжил олдсонгүй</p>
        </div>
      )}
    </div>
  );
}

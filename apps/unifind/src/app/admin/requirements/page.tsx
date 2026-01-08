'use client';

import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

type University = {
  id: number;
  name: string;
};

type Major = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  name: string;
  minScore: number;
};

export default function RequirementsPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [loading, setLoading] = useState(false);

  /* ================== FETCH ================== */

  // 1️⃣ Их сургуулиуд
  useEffect(() => {
    fetch('/api/universities')
      .then((r) => r.json())
      .then(setUniversities);
  }, []);

  // 2️⃣ Сонгосон сургуульд харьяалагдах мэргэжлүүд
  useEffect(() => {
    if (!selectedUniversity) return;

    fetch(`/api/majors?universityId=${selectedUniversity}`)
      .then((r) => r.json())
      .then(setMajors);

    // reset
    setSelectedMajor('');
    setSubjects([]);
  }, [selectedUniversity]);

  // 3️⃣ Сонгосон мэргэжлийн хичээлүүд
  useEffect(() => {
    if (!selectedMajor) return;

    fetch(`/api/requirements?majorId=${selectedMajor}`)
      .then((r) => r.json())
      .then((data) => {
        setSubjects(
          data.map((r: any) => ({
            id: r.subjects.id,
            name: r.subjects.name,
            minScore: r.min_score ?? 0,
          })),
        );
      });
  }, [selectedMajor]);

  /* ================== SAVE ================== */

  const handleSave = async () => {
    try {
      setLoading(true);

      await fetch('/api/requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          majorId: Number(selectedMajor),
          requirements: subjects.map((s) => ({
            subjectId: s.id,
            minScore: s.minScore,
          })),
        }),
      });

      toast.success('Шаардлага амжилттай хадгалагдлаа ✅');
    } catch {
      toast.error('Хадгалах үед алдаа гарлаа ❌');
    } finally {
      setLoading(false);
    }
  };

  /* ================== UI ================== */

  return (
    <div className="p-8 max-w-5xl">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Элсэлтийн шаардлага</h1>
        <p className="text-muted-foreground mt-1">Их сургууль → Мэргэжил → Хичээлийн доод оноо тохируулах</p>
      </div>

      {/* SELECTS */}
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* UNIVERSITY */}
        <Card>
          <CardHeader>
            <CardTitle>Их сургууль сонгох</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="Их сургууль сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {universities.map((u) => (
                  <SelectItem key={u.id} value={String(u.id)}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* MAJOR */}
        <Card>
          <CardHeader>
            <CardTitle>Мэргэжил сонгох</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMajor} onValueChange={setSelectedMajor} disabled={!selectedUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="Мэргэжил сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* SUBJECTS */}
      {selectedMajor ? (
        <Card>
          <CardHeader>
            <CardTitle>Хичээлийн шаардлага</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((s, i) => (
                <div key={s.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1">
                    <Label className="font-medium">{s.name}</Label>
                  </div>

                  <div className="w-32">
                    <Input
                      type="number"
                      min={0}
                      value={s.minScore}
                      onChange={(e) => {
                        const next = [...subjects];
                        next[i].minScore = Number(e.target.value);
                        setSubjects(next);
                      }}
                      className="text-center"
                    />
                  </div>

                  <div className="text-sm text-muted-foreground w-28">Доод оноо</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Хадгалж байна...' : 'Шаардлага хадгалах'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">Эхлээд их сургууль болон мэргэжил сонгоно уу</CardContent>
        </Card>
      )}
    </div>
  );
}

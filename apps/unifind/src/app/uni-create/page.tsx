'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { UniversityDialog } from '../admin/_components/UniversityDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function Page() {
  const [mode, setMode] = useState<'website' | 'manual'>('website');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);

  // manual dialog
  const [openManual, setOpenManual] = useState(false);

  const handleWebsiteSubmit = async () => {
    if (!website.startsWith('http')) {
      toast.error('Зөв website URL оруулна уу');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/universities/by-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Бүртгэхэд алдаа гарлаа');
        return;
      }

      toast.success('Их сургууль амжилттай бүртгэгдлээ 🚀');
      setWebsite('');
    } catch (e) {
      toast.error('Серверийн алдаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Их сургууль бүртгүүлэх</h1>

      {/* MODE SWITCH */}
      <div className="flex gap-3 mb-8">
        <Button variant={mode === 'website' ? 'default' : 'outline'} onClick={() => setMode('website')}>
          🌐 Website-тэй
        </Button>
        <Button variant={mode === 'manual' ? 'default' : 'outline'} onClick={() => setMode('manual')}>
          ✍️ Website байхгүй
        </Button>
      </div>

      {/* WEBSITE MODE */}
      {mode === 'website' && (
        <div className="space-y-4">
          <p className="text-muted-foreground">Албан ёсны website URL оруулбал систем автоматаар мэдээллийг татна</p>

          <div className="space-y-2">
            <Label>Их сургуулийн website</Label>
            <Input placeholder="https://www.num.edu.mn" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <Button className="bg-sky-500 hover:bg-sky-600 text-white" onClick={handleWebsiteSubmit} disabled={loading}>
            {loading ? 'Бүртгэж байна...' : 'Website-ээр бүртгүүлэх'}
          </Button>
        </div>
      )}

      {/* MANUAL MODE */}
      {mode === 'manual' && (
        <div className="space-y-4">
          <p className="text-muted-foreground">Website байхгүй бол гараар мэдээллээ бөглөж бүртгэнэ</p>

          <Button className="bg-sky-500 hover:bg-sky-600 text-white" onClick={() => setOpenManual(true)}>
            Гараар бүртгүүлэх
          </Button>

          {/* MANUAL UNIVERSITY DIALOG */}
          <UniversityDialog
            open={openManual}
            onOpenChange={setOpenManual}
            onSaved={() => {
              setOpenManual(false);
              toast.success('Их сургууль амжилттай бүртгэгдлээ 🎉');
            }}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Track, useApp } from '../context/app-context';

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function HomePage() {
  const router = useRouter();
  const { setTrack } = useApp();

  const [step, setStep] = useState<'SECTION' | 'SUBJECT'>('SECTION');
  const [section, setSection] = useState<string | null>(null);

  function selectSection(s: string) {
    setSection(s);
    setStep('SUBJECT');
  }

  function back() {
    setStep('SECTION');
    setSection(null);
  }

  function go(subject: Track) {
    setTrack(subject);
    router.push('/planner');
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_0)] [background-size:24px_24px]" />

      <div className="relative w-full max-w-5xl px-8 py-16 space-y-12">
        {/* Back button */}
        {step === 'SUBJECT' && (
          <button onClick={back} className="absolute top-6 left-6 text-sm text-gray-500 hover:text-gray-800 transition">
            ← Буцах
          </button>
        )}

        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-semibold text-center text-gray-700">
          {step === 'SECTION' ? 'Суралцах чиглэлээ сонгоно уу' : 'Хичээлээ сонгоно уу'}
        </motion.h1>

        <AnimatePresence mode="wait">
          {step === 'SECTION' && (
            <motion.div key="section" {...cardMotion} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SectionCard title="🌐 Language" desc="English · Japanese · Chinese" onClick={() => selectSection('LANGUAGE')} />
              <SectionCard title="🧠 Logic" desc="Math · Physics" onClick={() => selectSection('LOGIC')} />
              <SectionCard title="📚 Humanities" desc="History · Biology · Social Studies" onClick={() => selectSection('HISTORY')} />
            </motion.div>
          )}

          {step === 'SUBJECT' && (
            <motion.div key="subject" {...cardMotion} className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {section === 'LANGUAGE' && (
                <>
                  <SubjectCard label="🇺🇸 English" onClick={() => go('English')} />
                  <SubjectCard label="🇯🇵 Japanese" onClick={() => go('Japanese')} />
                  <SubjectCard label="🇨🇳 Chinese" onClick={() => go('Chinese')} />
                </>
              )}

              {section === 'LOGIC' && (
                <>
                  <SubjectCard label="➗ Math" onClick={() => go('Math')} />
                  <SubjectCard label="⚛️ Physics" onClick={() => go('Physics')} />
                </>
              )}

              {section === 'HISTORY' && (
                <>
                  <SubjectCard label="🕰 History" onClick={() => go('History')} />
                  <SubjectCard label="🧬 Biology" onClick={() => go('Biology')} />
                  <SubjectCard label="🏛 Social Studies" onClick={() => go('Social Studies')} />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function SectionCard({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={onClick} className="cursor-pointer rounded-2xl bg-white p-8 text-center shadow-sm hover:shadow-lg transition">
      <h2 className="text-xl font-medium">{title}</h2>
      <p className="text-gray-400 mt-3">{desc}</p>
    </motion.div>
  );
}

function SubjectCard({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onClick} className="rounded-xl bg-white py-6 text-lg font-medium shadow hover:shadow-md transition">
      {label}
    </motion.button>
  );
}

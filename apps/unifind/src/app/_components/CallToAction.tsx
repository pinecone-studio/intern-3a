'use client';

import { SignUpButton } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from '../components/ui/button';

export function CallToAction() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="py-20 bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Суралцах аяллаа эхлүүлэхэд бэлэн үү?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Үнэгүй бүртгэл үүсгэж, сонирхсон их сургуулиудаа хадгалах, элсэлтийн хугацааг хянах болон танд тохирсон зөвлөмжүүдийг хүлээж аваарай.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <SignUpButton>
              <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8">
                Үнэгүй бүртгэл үүсгэх
              </Button>
            </SignUpButton>

            <Button size="lg" variant="outline" className="dark:bg-gray-900 dark:hover:bg-gray-800" onClick={() => setShowDetails(!showDetails)}>
              Дэлгэрэнгүй мэдээлэл
            </Button>
          </div>

          {/* Collapsible content */}
          {showDetails && (
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-left space-y-4">
              <h3 className="text-xl font-semibold">Манай сайт юу хийдэг вэ?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Сонирхсон их сургуулиудын мэдээллийг хадгалах</li>
                <li>Элсэлтийн огноо, хуваарийг хянах</li>
                <li>Танд тохирсон зөвлөмжүүдийг гаргах</li>
                <li>Өргөдөл, тэтгэлгийн мэдээлэл нэг дор харах</li>
                <li>Суралцах аяллаа илүү хялбар төлөвлөх</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

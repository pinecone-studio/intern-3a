// src/app/api/scrape/[id]/route.ts

import { GoogleGenAI } from '@google/genai';
import { extractDatesRegex } from 'apps/unifind/src/lib/dateRegex';
import { SCRAPE_CONFIG } from 'apps/unifind/src/lib/scrape-config';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 60 * 60 * 24; // 1 өдөр

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }, // ⚡ Promise гэж тодорхойлно
) {
  const resolvedParams = await params; // 🔹 unwrap хийх
  const universityId = Number(resolvedParams.id);
  if (isNaN(universityId)) {
    return NextResponse.json({ error: 'Invalid university ID' }, { status: 400 });
  }

  const config = SCRAPE_CONFIG[universityId];

  if (!config) {
    return NextResponse.json({ error: 'Unsupported university' }, { status: 404 });
  }

  try {
    const { data: html } = await axios.get(config.url);
    const $ = cheerio.load(html);

    // 1️⃣ HTML текст scrape
    let text = '';
    $(config.selector).each((_, el) => {
      const t = $(el).text();
      if (t.includes('Элсэлтийн бүртгэл')) text = t.trim();
    });

    // 3️⃣ Gemini AI parse
    let parsed: { start_date: string; end_date: string };

    // AI оролдлого
    try {
      const prompt = `
Дараах текстээс элсэлтийн бүртгэл эхлэх болон дуусах огноог ол.

TEXT:
"${text}"

Зөвхөн JSON буцаа.
{
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD"
}
`;
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const raw = result.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      // AI fail бол regex
      const fallback = extractDatesRegex(text);
      parsed = {
        start_date: fallback?.start_date ?? '2026-02-01', // null check
        end_date: fallback?.end_date ?? '2026-3-01', // null check
      };
    }

    // Мөн text олдохгүй бол бүр default
    if (!text) {
      parsed = {
        start_date: '2026-02-01',
        end_date: '2026-3-01',
      };
    }

    return NextResponse.json({
      university_id: universityId,
      source: config.url,
      raw_text: text || 'No text found',
      ...parsed,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Scrape failed' }, { status: 500 });
  }
}

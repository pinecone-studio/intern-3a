// src/app/api/turshih/route.ts
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

// ✅ Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
  try {
    const url = "https://elselt.num.edu.mn/?page_id=12";

    // 1️⃣ HTML татах
    const { data: html } = await axios.get(url);

    // 2️⃣ HTML parse
    const $ = cheerio.load(html);

    let targetText = "";

    $("p").each((_, el) => {
      const text = $(el).text();
      if (text.includes("Элсэлтийн бүртгэл") && text.includes("явагдана")) {
        targetText = text.trim();
      }
    });

    if (!targetText) {
      return NextResponse.json({ error: "Текст олдсонгүй" }, { status: 404 });
    }

    // 3️⃣ Gemini prompt
    const prompt = `
Дараах текстээс элсэлтийн бүртгэл эхлэх болон дуусах огноог ол.

TEXT:
"${targetText}"

Зөвхөн JSON буцаа. Тайлбар бичихгүй.

{
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD"
}
`;

    // 4️⃣ Gemini 2.5-flash ашиглан generateContent call
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 5️⃣ Цэвэрлэх
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const cleanText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // 6️⃣ JSON parse хийх
    const parsed = JSON.parse(cleanText);

    return NextResponse.json({
      source: url,
      raw_text: targetText,
      start_date: parsed.start_date,
      end_date: parsed.end_date,
    });
  } catch (error) {
    console.error("Scrape + Gemini error:", error);
    return NextResponse.json(
      { error: "Scrape + Gemini failed" },
      { status: 500 }
    );
  }
}

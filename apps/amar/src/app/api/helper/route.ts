import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  const { problem } = await req.json();

  const prompt = `
Give hints only. No final answers.
JSON only.

{
  "steps": [{ "hint": "string" }]
}

Problem: ${problem}
`;

  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return NextResponse.json(JSON.parse(res.text!));
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { HomeworkHintRequest, HomeworkHintResponse } from "apps/amar/src/types";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body: HomeworkHintRequest = await req.json();

    if (!body.question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are a homework helper.
DO NOT give the final answer.
ONLY give step-by-step hints.

Return STRICT JSON:
{
  "steps": [
    { "step": 1, "hint": "string" }
  ]
}

Question:
${body.question}
`;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!res.text) throw new Error("Empty AI response");

    const jsonStart = res.text.indexOf("{");
    const jsonEnd = res.text.lastIndexOf("}") + 1;

    const parsed: HomeworkHintResponse = JSON.parse(
      res.text.slice(jsonStart, jsonEnd)
    );

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate hints" },
      { status: 500 }
    );
  }
}

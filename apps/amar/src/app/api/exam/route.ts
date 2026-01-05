import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { GenerateExamRequest, GenerateExamResponse } from "apps/amar/src/types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExamRequest = await req.json();

    const prompt = `
Generate 5 multiple-choice exam questions.

Rules:
- Difficulty: ${body.difficulty}
- Subject: ${body.subject}
- Topic: ${body.topic}

STRICT JSON:
{
  "questions": [
    {
      "id": "string",
      "question": "string",
      "options": ["A","B","C","D"],
      "correctAnswerIndex": number
    }
  ]
}
`;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!res.text) throw new Error();

    const json = JSON.parse(
      res.text.slice(
        res.text.indexOf("{"),
        res.text.lastIndexOf("}") + 1
      )
    ) as GenerateExamResponse;

    return NextResponse.json(json);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate exam" },
      { status: 500 }
    );
  }
}

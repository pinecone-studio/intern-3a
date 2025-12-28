import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { GenerateStudyPlanRequest, GenerateStudyPlanResponse, WeeklyStudyPlan } from '../../../types';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

/**
 * POST /api/study-plan
 */
export async function POST(req: NextRequest) {
  try {
    const body: GenerateStudyPlanRequest = await req.json();

    // Basic validation (strict but simple)
    if (!body.subject || !body.deadline || !body.dailyHours || !body.level) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const prompt = buildPrompt(body);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    console.log({ text });

    if (!text) {
      return NextResponse.json({ error: 'AI returned empty response' }, { status: 500 });
    }

    const plan = parseAIResponse(text);

    const result: GenerateStudyPlanResponse = {
      plan,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Study plan generation failed:', error);

    return NextResponse.json({ error: 'Failed to generate study plan' }, { status: 500 });
  }
}

function buildPrompt(data: GenerateStudyPlanRequest): string {
  return `
You are an AI study planner.

Create a ONE-WEEK study plan as STRICT JSON.
DO NOT include explanations.
DO NOT include markdown.
DO NOT include comments.

Rules:
- Week starts today
- 5 days (Mon–Fri)
- Daily total study time must not exceed ${data.dailyHours} hours
- Difficulty level: ${data.level}
- Subject: ${data.subject}
- Deadline: ${data.deadline}

JSON FORMAT (EXACT):
{
  "weekStart": "YYYY-MM-DD",
  "days": [
    {
      "date": "YYYY-MM-DD",
      "tasks": [
        {
          "id": "string",
          "subject": "string",
          "topic": "string",
          "duration": number,
          "status": "Pending"
        }
      ]
    }
  ]
}
`;
}
function parseAIResponse(text: string): WeeklyStudyPlan {
  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;

    const cleanJson = text.slice(jsonStart, jsonEnd);
    const parsed = JSON.parse(cleanJson);

    return parsed as WeeklyStudyPlan;
  } catch {
    throw new Error('Failed to parse AI JSON');
  }
}

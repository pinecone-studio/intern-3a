import { gemini } from 'apps/amar/src/lib/gemini';
import { ExerciseQuestion } from 'apps/amar/src/lib/models/ExerciseQuestion';
import { connectDB } from 'apps/amar/src/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  const { focusAreaId, focusTitle } = await req.json();

  if (!focusAreaId || !focusTitle) {
    return NextResponse.json({ error: 'focusAreaId and focusTitle required' }, { status: 400 });
  }

  const prompt = `
Generate 5 MCQ practice questions.

Focus area:
${focusTitle}

RULES:
- Exactly 4 options per question
- Only one correct answer
- Include short explanation (shown after failure)
- JSON only

FORMAT:
{
  "questions": [
    {
      "prompt": "string",
      "options": ["A", "B", "C", "D"],
      "correctIndex": number,
      "explanation": "string"
    }
  ]
}
`;

  const res = await gemini.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  if (!res.text) {
    return NextResponse.json({ error: 'AI response empty' }, { status: 500 });
  }

  const parsed = JSON.parse(res.text.slice(res.text.indexOf('{'), res.text.lastIndexOf('}') + 1));

  const questions = await ExerciseQuestion.insertMany(
    parsed.questions.map((q: unknown) => ({
      ...(q as {
        prompt: string;
        options: string[];
        correctIndex: number;
        explanation: string;
      }),
      focusAreaId,
    })),
  );

  return NextResponse.json(questions);
}

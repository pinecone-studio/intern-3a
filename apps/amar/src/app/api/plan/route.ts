import { gemini } from 'apps/amar/src/lib/gemini';
import { StudyPlan } from 'apps/amar/src/lib/models/StudyPlan';
import { connectDB } from 'apps/amar/src/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  const { focusAreaId, focusTitle } = await req.json();

  if (!focusAreaId || !focusTitle) {
    return NextResponse.json({ error: 'focusAreaId and focusTitle required' }, { status: 400 });
  }

  const prompt = `
You are an AI study planner.

Focus area:
${focusTitle}

STRICT RULES:
- Output JSON only
- No explanations
- No markdown
- Generate a ONE-WEEK plan
- 5 days
- Each task 30–120 minutes

JSON FORMAT:
{
  "weekStart": "YYYY-MM-DD",
  "tasks": [
    { "topic": "string", "duration": number }
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

  const json = JSON.parse(res.text.slice(res.text.indexOf('{'), res.text.lastIndexOf('}') + 1));

  const plan = await StudyPlan.create({
    focusAreaId,
    weekStart: json.weekStart,
    tasks: json.tasks,
  });

  return NextResponse.json(plan);
}

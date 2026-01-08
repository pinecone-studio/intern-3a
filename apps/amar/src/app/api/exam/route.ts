import { ExamResult } from 'apps/amar/src/lib/models/ExamResult';
import { FocusArea } from 'apps/amar/src/lib/models/FocusArea';
import { connectDB } from 'apps/amar/src/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  const { focusAreaId, correct, total } = await req.json();

  if (!focusAreaId || typeof correct !== 'number' || typeof total !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const score = Math.round((correct / total) * 100);
  const recommendation = score < 70 ? 'REPLAN' : 'ADVANCE';

  await ExamResult.create({
    focusAreaId,
    score,
    recommendation,
  });

  if (recommendation === 'ADVANCE') {
    await FocusArea.findByIdAndUpdate(focusAreaId, {
      status: 'completed',
      confidence: score,
    });
  }

  return NextResponse.json({ score, recommendation });
}

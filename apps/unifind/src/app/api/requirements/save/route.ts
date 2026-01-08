import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { majorId, requirements } = body;

    if (!majorId || !Array.isArray(requirements)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    for (const r of requirements) {
      if (!r.subjectId) continue;

      await prisma.major_requirements.upsert({
        where: {
          major_id_subject_id: {
            major_id: majorId,
            subject_id: r.subjectId,
          },
        },
        update: {
          min_score: Number(r.minScore) || 0,
        },
        create: {
          major_id: majorId,
          subject_id: r.subjectId,
          min_score: Number(r.minScore) || 0,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SAVE REQUIREMENTS ERROR:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

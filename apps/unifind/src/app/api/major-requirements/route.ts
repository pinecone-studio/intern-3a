import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { majorId, requirements } = body;

    if (!majorId || !Array.isArray(requirements)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 1️⃣ хуучныг цэвэрлэнэ
    await prisma.major_requirements.deleteMany({
      where: { major_id: majorId },
    });

    // 2️⃣ шинээр хадгална
    await prisma.major_requirements.createMany({
      data: requirements.map((r) => ({
        major_id: majorId,
        subject_id: r.subjectId,
        min_score: r.minScore,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

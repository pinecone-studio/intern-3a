import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 🔥 ЗААВАЛ await
  const majorId = Number(id);

  if (isNaN(majorId)) {
    return NextResponse.json({ error: 'Invalid major id' }, { status: 400 });
  }

  try {
    const major = await prisma.majors.findUnique({
      where: { id: majorId },
      include: {
        universities: true,
        major_requirements: {
          include: { subjects: true },
        },
      },
    });

    if (!major) {
      return NextResponse.json({ error: 'Мэргэжил олдсонгүй' }, { status: 404 });
    }

    return NextResponse.json(major);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Серверийн алдаа' }, { status: 500 });
  }
}

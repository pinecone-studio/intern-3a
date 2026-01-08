import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const majorId = Number(searchParams.get('majorId'));

  if (!majorId) {
    return NextResponse.json([], { status: 200 });
  }

  const data = await prisma.major_requirements.findMany({
    where: { major_id: majorId },
    include: {
      subjects: true,
    },
    orderBy: {
      subject_id: 'asc',
    },
  });

  return NextResponse.json(data);
}

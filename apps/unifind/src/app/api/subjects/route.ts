import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const subjects = await prisma.subjects.findMany({
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(subjects);
}

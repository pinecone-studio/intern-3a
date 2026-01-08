import { latinToCyrillic } from '@/lib/latinToCyrillic';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) return NextResponse.json([]);

  const cyrillicQuery = latinToCyrillic(q);

  const universities = await prisma.universities.findMany({
    where: {
      name: {
        contains: cyrillicQuery,
        mode: 'insensitive',
      },
    },
    take: 6,
  });

  return NextResponse.json(universities);
}

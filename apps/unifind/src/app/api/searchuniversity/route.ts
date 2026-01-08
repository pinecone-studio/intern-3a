import { latinToCyrillic } from '@/lib/latinToCyrillic';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({
      universities: [],
      majors: [],
    });
  }

  const query = latinToCyrillic(q);

  const universities = await prisma.universities.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      city: true,
    },
    take: 5,
  });

  const majors = await prisma.majors.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      universities: {
        select: {
          id: true,
          name: true,
          city: true,
        },
      },
    },
    take: 5,
  });

  return NextResponse.json({
    universities,
    majors,
  });
}

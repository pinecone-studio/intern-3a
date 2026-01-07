import { latinToCyrillic } from '@/lib/latinToCyrillic';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get('query');

    if (!q || !q.trim()) {
      return NextResponse.json({
        universities: [],
        majors: [],
      });
    }

    const query = latinToCyrillic(q.trim());

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
  } catch (error) {
    console.error('SEARCH ERROR:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

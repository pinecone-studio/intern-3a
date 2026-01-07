import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const minScore = parseInt(searchParams.get('minScore') || '0');

    const where: any = {
      AND: [],
    };

    if (search) {
      where.AND.push({
        name: { contains: search, mode: 'insensitive' },
      });
    }

    if (minScore > 0) {
      where.AND.push({
        majors: {
          some: {
            major_requirements: {
              some: {
                min_score: { gte: minScore },
              },
            },
          },
        },
      });
    }

    const universities = await prisma.universities.findMany({
      where: where,
      include: {
        _count: {
          select: { majors: true },
        },
        majors: {
          include: {
            major_requirements: {
              include: {
                subjects: true,
              },
            },
          },
        },
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
    });

    const universitiesWithMinScore = universities.map((univ) => {
      const allMinScores = univ.majors.flatMap((m: any) => m.major_requirements.map((r: any) => r.min_score));
      const minScore = allMinScores.length > 0 ? Math.min(...allMinScores) : null;
      return { ...univ, minScore };
    });

    return NextResponse.json(universitiesWithMinScore);
  } catch (error: any) {
    console.error('API Error details:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const university = await prisma.universities.create({
    data: {
      name: body.name,
      city: body.city,
      description: body.description,
      website: body.website,
    },
  });

  return NextResponse.json(university);
}

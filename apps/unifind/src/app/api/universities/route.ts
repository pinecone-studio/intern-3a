import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const universities = await prisma.universities.findMany({
      include: {
        _count: {
          select: { majors: true },
        },
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
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
      where,
      include: {
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
    });

    return NextResponse.json(universities);
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
      website: body.website,
      description: body.description,
      burtgelehleh_start_date: body.startDate ? new Date(body.startDate) : undefined,
      burtgelduusah_end_date: body.endDate ? new Date(body.endDate) : undefined,
    },
  });

  return NextResponse.json(university);
}

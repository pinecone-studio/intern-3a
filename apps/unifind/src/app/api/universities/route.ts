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
    });

    return NextResponse.json(universities);
  } catch (error) {
    console.error('GET /api/universities error:', error);
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 });
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

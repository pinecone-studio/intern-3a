import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';
    const majorNamesStr = searchParams.get('majorNames') || '';
    const majorNames = majorNamesStr ? majorNamesStr.split(',').filter(Boolean) : [];

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (majorNames.length > 0) {
      where.majors = {
        some: {
          name: {
            in: majorNames,
          },
        },
      };
    }

    const universities = await prisma.universities.findMany({
      where,
      include: {
        majors: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(universities);
  } catch (error) {
    console.error('GET /api/universities error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const university = await prisma.universities.create({
      data: {
        name: body.name,
        city: body.city,
        description: body.description ?? null,
        website: body.website ?? null,
      },
    });

    return NextResponse.json(university);
  } catch (error) {
    console.error('POST /api/universities error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

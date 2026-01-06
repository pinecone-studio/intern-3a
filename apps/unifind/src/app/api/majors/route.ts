import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get('universityId');

  if (!universityId) {
    return NextResponse.json([]);
  }

  const majors = await prisma.majors.findMany({
    where: {
      university_id: Number(universityId),
    },
    include: {
      universities: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return NextResponse.json(majors);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const universityId = Number(body.university_id);

    if (!body.name || Number.isNaN(universityId)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const major = await prisma.majors.create({
      data: {
        name: body.name,
        description: body.description || null,
        degree_type: body.degree_type,
        university_id: universityId,
      },
    });

    return NextResponse.json(major, { status: 201 });
  } catch (error) {
    console.error('POST /api/majors error:', error);
    return NextResponse.json({ error: 'Failed to create major' }, { status: 500 });
  }
}

import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get('university_id');

  const majors = await prisma.majors.findMany({
    where: universityId ? { university_id: Number(universityId) } : undefined,
    include: {
      major_requirements: {
        include: { subjects: true },
      },
      universities: true,
    },
  });

  return NextResponse.json(majors);
}

export async function POST(req: Request) {
  const body = await req.json();

  const major = await prisma.majors.create({
    data: {
      name: body.name,
      description: body.description,
      degree_type: body.degree_type,
      university_id: body.university_id,
    },
  });

  return NextResponse.json(major);
}

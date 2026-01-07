import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const universityId = searchParams.get('universityId');

//   if (!universityId) {
//     return NextResponse.json([]);
//   }

//   const majors = await prisma.majors.findMany({
//     where: {
//       university_id: Number(universityId),
//     },
//     include: {
//       universities: true,
//     },
//     orderBy: {
//       created_at: 'desc',
//     },
//   });

//   return NextResponse.json(majors);
// }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get('universityId');

  const majors = await prisma.majors.findMany({
    where: universityId ? { university_id: Number(universityId) } : undefined,
    orderBy: {
      created_at: 'desc',
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

// apps/unifind/src/app/api/majors/[id]/route.ts

import prisma from 'apps/unifind/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log({ params });
  const majorId = Number(params.id);

  console.log({ majorId });
  try {
    const major = await prisma.majors.findUnique({
      where: { id: majorId },
      include: {
        universities: true, // их сургуулийн мэдээллийг хамт авах
        major_requirements: {
          include: {
            subjects: true, // хэрэв шаардлага болон subjects хэрэгтэй бол
          },
        },
      },
    });

    if (!major) {
      return NextResponse.json({ error: 'Мэргэжил олдсонгүй' }, { status: 404 });
    }

    return NextResponse.json(major);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Алдаа гарлаа' }, { status: 500 });
  }
}

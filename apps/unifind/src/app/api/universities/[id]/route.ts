import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

type Params = {
  id: string;
};

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params; // 🔥 ЭНЭ Л ЧУХАЛ

  const universityId = Number(id);

  if (!id || Number.isNaN(universityId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const university = await prisma.universities.findUnique({
    where: { id: universityId },
    include: {
      majors: true,
    },
  });

  if (!university) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(university);
}

export async function PATCH(req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const body = await req.json();

  const universityId = Number(id);

  if (!id || Number.isNaN(universityId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const university = await prisma.universities.update({
    where: { id: universityId },
    data: {
      name: body.name,
      city: body.city,
      website: body.website || null,
      description: body.description || null,
      image: body.image || null,
      burtgelehleh_start_date: body.startDate ? new Date(body.startDate) : undefined,
      burtgelduusah_end_date: body.endDate ? new Date(body.endDate) : undefined,
    },
  });

  return NextResponse.json(university);
}

export async function DELETE(_req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  const universityId = Number(id);

  if (!id || Number.isNaN(universityId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  await prisma.universities.delete({
    where: { id: universityId },
  });

  return NextResponse.json({ success: true });
}

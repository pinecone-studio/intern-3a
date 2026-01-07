import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Params = { id: string };

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const majorId = Number(id);

  if (isNaN(majorId)) {
    return NextResponse.json({ error: 'Invalid major id' }, { status: 400 });
  }

  const major = await prisma.majors.findUnique({
    where: { id: majorId },
    include: {
      universities: true,
      major_requirements: {
        include: { subjects: true },
      },
    },
  });

  if (!major) {
    return NextResponse.json({ error: 'Мэргэжил олдсонгүй' }, { status: 404 });
  }

  return NextResponse.json(major);
}

export async function PATCH(req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const majorId = Number(id);
  const body = await req.json();

  if (isNaN(majorId)) {
    return NextResponse.json({ error: 'Invalid major id' }, { status: 400 });
  }

  const updated = await prisma.majors.update({
    where: { id: majorId },
    data: {
      name: body.name,
      description: body.description || null,
      degree_type: body.degree_type,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const majorId = Number(id);

  if (isNaN(majorId)) {
    return NextResponse.json({ error: 'Invalid major id' }, { status: 400 });
  }

  await prisma.majors.delete({
    where: { id: majorId },
  });

  return NextResponse.json({ success: true });
}

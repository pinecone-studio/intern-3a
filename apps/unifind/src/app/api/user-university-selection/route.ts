// src/app/api/user-university-selection/route.ts

import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = Number(url.searchParams.get('user_id'));
  const selections = await prisma.user_university_selection.findMany({
    where: { user_id: userId },
    include: { universities: true },
  });

  const events = selections.map((sel) => ({
    title: sel.universities.name,
    start: sel.start_date.toISOString().split('T')[0],
    end: sel.end_date.toISOString().split('T')[0],
  }));

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const { user_id, university_id, start_date, end_date } = await req.json();
  const selection = await prisma.user_university_selection.create({
    data: { user_id, university_id, start_date: new Date(start_date), end_date: new Date(end_date) },
  });
  return NextResponse.json(selection);
}

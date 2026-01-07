// src/app/api/user-university-selection/route.ts
import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type SelectionInput = {
  user_id: number;
  university_id: number;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
};

// ----------------- CREATE -----------------
export async function POST(req: Request) {
  try {
    const body: SelectionInput = await req.json();
    const { user_id, university_id, start_date, end_date } = body;

    // Бүх талбарыг шалгах
    if (!user_id || !university_id || !start_date || !end_date) {
      return NextResponse.json({ error: 'user_id, university_id, start_date, end_date шаардлагатай' }, { status: 400 });
    }

    // ✅ Аль хэдийн хадгалагдсан эсэхийг шалгах
    const existing = await prisma.user_university_selection.findFirst({
      where: {
        user_id,
        university_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });
    console.log({ existing });

    if (existing) {
      return NextResponse.json({ message: 'Энэ сонголт аль хэдийн хадгалагдсан' }, { status: 200 });
    }

    // Хэрэглэгчийн сонголт үүсгэх
    const selection = await prisma.user_university_selection.create({
      data: {
        user_id,
        university_id,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });

    return NextResponse.json(selection);
  } catch (error) {
    console.error('Error creating user_university_selection:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ----------------- READ -----------------
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userIdParam = url.searchParams.get('user_id');
    const userId = userIdParam ? Number(userIdParam) : undefined;

    const selections = await prisma.user_university_selection.findMany({
      where: userId ? { user_id: userId } : undefined,
      include: {
        universities: true,
      },
    });

    // Frontend-д зориулсан FullCalendar events
    const events = selections.map((sel) => ({
      title: sel.universities.name,
      start: sel.start_date.toISOString().split('T')[0], // YYYY-MM-DD
      end: sel.end_date.toISOString().split('T')[0], // YYYY-MM-DD
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching selections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

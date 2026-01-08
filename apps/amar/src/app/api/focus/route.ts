import { FocusArea } from 'apps/amar/src/lib/models/FocusArea';
import { connectDB } from 'apps/amar/src/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();

  const { track, title } = await req.json();

  if (!track || !title) {
    return NextResponse.json({ error: 'track and title required' }, { status: 400 });
  }

  const focus = await FocusArea.create({
    track,
    title,
  });

  return NextResponse.json(focus, { status: 201 });
}

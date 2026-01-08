import { LearningRoadmap } from 'apps/amar/src/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const trackId = req.nextUrl.searchParams.get('trackId');

  if (!trackId) {
    return NextResponse.json({ error: 'trackId required' }, { status: 400 });
  }

  const roadmap: LearningRoadmap = {
    trackId,
    stages: [
      { id: '1', title: 'Basics', order: 1, completed: true },
      { id: '2', title: 'Grammar', order: 2, completed: false },
      { id: '3', title: 'Conversation', order: 3, completed: false },
    ],
  };

  return NextResponse.json(roadmap);
}

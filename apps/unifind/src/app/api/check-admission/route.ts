import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

type ScoreInput = {
  subject_id: number;
  score: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scores: ScoreInput[] = body.scores;

    if (!Array.isArray(scores)) {
      return NextResponse.json({ error: 'scores is required and must be an array' }, { status: 400 });
    }

    const majors = await prisma.majors.findMany({
      include: {
        universities: true,
        major_requirements: {
          include: {
            subjects: true,
          },
        },
      },
    });

    const results = majors.filter((major) =>
      major.major_requirements.every((req) => {
        const userScore = scores.find((s) => s.subject_id === req.subject_id);
        return userScore && userScore.score >= req.min_score;
      }),
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

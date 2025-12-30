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

    if (!Array.isArray(scores) || scores.some((s) => typeof s.subject_id !== 'number' || typeof s.score !== 'number')) {
      return NextResponse.json({ error: 'scores is required and must be an array of objects with subject_id and score' }, { status: 400 });
    }

    // Бүх мэргэжлийн мэдээлэл
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

    // Тохирох мэргэжлүүдийг шүүлт хийх
    const results = majors.filter((major) => {
      return major.major_requirements.every((req) => {
        const userScore = scores.find((s) => s.subject_id === req.subject_id);
        return userScore ? userScore.score >= req.min_score : false;
      });
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in /api/check-admission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

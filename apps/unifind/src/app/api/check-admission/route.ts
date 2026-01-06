// src/app/api/check-admission-scholarship/route.ts

import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ScoreInput = { subject_id: number; score: number };

export async function POST(req: Request) {
  try {
    const { scores } = (await req.json()) as { scores: ScoreInput[] };
    if (!Array.isArray(scores) || scores.length === 0) {
      return NextResponse.json({ error: 'scores массив хоосон байна' }, { status: 400 });
    }

    // 1️⃣ Бүх majors-г авч ирэх
    const majors = await prisma.majors.findMany({
      include: {
        universities: true,
        major_requirements: { include: { subjects: true } },
      },
    });

    const results = [];

    for (const major of majors) {
      // 2️⃣ Хэрэглэгчийн оноогоор requirements шалгах
      const requirements = major.major_requirements.map((req) => {
        const userScore = scores.find((s) => s.subject_id === req.subject_id);
        return {
          subject: req.subjects?.name ?? 'Unknown',
          minScore: req.min_score,
          userScore: userScore?.score ?? 0,
          meets: userScore ? userScore.score >= req.min_score : false,
        };
      });

      const allMet = requirements.every((r) => r.meets);

      // 3️⃣ Scholarship-ийг **хамгийн өндөр тохирох** байдлаар олж авах
      const mathScore = scores.find((s) => s.subject_id === 1)?.score ?? 0;
      const englishScore = scores.find((s) => s.subject_id === 2)?.score ?? 0;

      const scholarships = await prisma.scholarship_rules.findMany({
        where: {
          university_id: major.university_id,
          major_id: major.id,
          min_math_score: { lte: mathScore },
          min_english_score: { lte: englishScore },
        },
      });

      // ✅ Хамгийн өндөр discount-ийг сонгох
      const scholarshipPercent = scholarships.length > 0 ? Math.max(...scholarships.map((s) => s.discount_percent)) : 0;

      results.push({
        university: major.universities.name,
        university_id: major.university_id,
        major: major.name,
        majorid: major.id,
        allRequirementsMet: allMet,
        requirements,
        scholarshipPercent,
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in /api/check-admission-scholarship:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

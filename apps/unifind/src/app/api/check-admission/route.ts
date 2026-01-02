import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ScoreInput = {
  subject_id: number;
  score: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { scores, major_id } = body as {
      scores: ScoreInput[];
      major_id?: number | null;
    };

    if (
      !Array.isArray(scores) ||
      scores.length === 0 ||
      scores.some(
        (s) => typeof s.subject_id !== "number" || typeof s.score !== "number"
      )
    ) {
      return NextResponse.json(
        { error: "scores must be a non-empty array with subject_id and score" },
        { status: 400 }
      );
    }

    // Бүх majors-г авч ирнэ, major_id сонгосон бол filter
    const majors = await prisma.majors.findMany({
      where: major_id ? { id: major_id } : undefined,
      include: {
        universities: true,
        major_requirements: { include: { subjects: true } },
      },
    });

    // meets info-г нэмнэ
    const results = majors.map((major) => {
      const requirements = major.major_requirements.map((req) => {
        const userScore = scores.find((s) => s.subject_id === req.subject_id);
        return {
          ...req,
          userScore: userScore?.score ?? null,
          meets: userScore ? userScore.score >= req.min_score : false,
        };
      });

      const allMet = requirements.every((r) => r.meets);

      return { ...major, requirements, allMet };
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in /api/check-admission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

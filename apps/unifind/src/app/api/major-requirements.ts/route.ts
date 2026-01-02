import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const reqRow = await prisma.major_requirements.create({
    data: {
      major_id: body.major_id,
      subject_id: body.subject_id,
      min_score: body.min_score,
    },
  });

  return NextResponse.json(reqRow);
}

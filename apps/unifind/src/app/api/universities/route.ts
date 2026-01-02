import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const universities = await prisma.universities.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(universities);
}

export async function POST(req: Request) {
  const body = await req.json();

  const university = await prisma.universities.create({
    data: {
      name: body.name,
      city: body.city,
      description: body.description,
      website: body.website,
    },
  });

  return NextResponse.json(university);
}

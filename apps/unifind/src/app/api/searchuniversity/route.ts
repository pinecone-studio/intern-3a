// src/app/api/universities/route.ts
import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || ""; // search text
    const limit = parseInt(url.searchParams.get("limit") || "10"); // default 10

    // Хайлтаар filter
    const universities = await prisma.universities.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { city: { contains: query, mode: "insensitive" } },
        ],
      },
      take: limit,
      orderBy: { name: "asc" },
    });

    return NextResponse.json(universities);
  } catch (error) {
    console.error("Error in /api/universities:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ilgeeh: "Сайн байна уу! Next.js API route юм." });
}

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const [universities, majors, applications, scholarships] = await Promise.all([
    prisma.universities.count(),
    prisma.majors.count(),
    prisma.user_university_selection.count(),
    prisma.scholarship_rules.count(),
  ]);

  return NextResponse.json({
    universities,
    majors,
    applications,
    scholarships,
  });
}

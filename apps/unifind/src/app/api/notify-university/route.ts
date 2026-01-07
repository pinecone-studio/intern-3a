import { adminMessaging } from 'apps/unifind/src/lib/firebaseAdmin';
import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Өнөөдөр элсэлт эхэлж байгаа сургуулиуд
    const universities = await prisma.universities.findMany({
      where: { burtgelehleh_start_date: today },
      include: {
        user_university_selection: {
          include: {
            mrusers: {
              include: { push_tokens: true },
            },
          },
        },
      },
    });

    for (const uni of universities) {
      for (const selection of uni.user_university_selection) {
        const tokens = selection.mrusers.push_tokens.map((t) => t.token);
        if (!tokens.length) continue;

        await adminMessaging.sendEachForMulticast({
          tokens,
          notification: {
            title: '📢 Элсэлт эхэллээ!',
            body: `${uni.name} сургуулийн элсэлт өнөөдөр эхэллээ`,
          },
          data: { universityId: String(uni.id) },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Notification failed' }, { status: 500 });
  }
}

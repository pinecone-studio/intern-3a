// apps/unifind/src/app/api/cron/enrollment-start/route.ts
import { adminMessaging } from 'apps/unifind/src/lib/firebaseAdmin';
import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Өнөөдөр элсэлт эхэлж байгаа сургуулиуд
    const universities = await prisma.universities.findMany({
      where: {
        burtgelehleh_start_date: today,
      },
      include: {
        user_university_selection: {
          include: {
            mrusers: {
              include: {
                push_tokens: true, // хэрэглэгчийн token
              },
            },
          },
        },
      },
    });

    for (const uni of universities) {
      for (const selection of uni.user_university_selection) {
        const tokens = selection.mrusers.push_tokens.map((t) => t.token);

        if (!tokens.length) continue;

        try {
          const response = await adminMessaging.sendEachForMulticast({
            tokens,
            notification: {
              title: '📢 Элсэлт эхэллээ!',
              body: `${uni.name} сургуулийн элсэлт өнөөдөр эхэллээ`,
            },
            data: {
              universityId: String(uni.id),
            },
          });

          // Хэрвээ token-д алдаа гарвал устгах
          response.responses.forEach((r, idx) => {
            if (!r.success) {
              prisma.push_tokens.delete({
                where: { token: tokens[idx] },
              });
            }
          });
        } catch (err) {
          console.error('Push notification failed for user:', selection.mrusers.id, err);
        }
      }
    }

    return NextResponse.json({ success: true, universities: universities.length });
  } catch (err) {
    console.error('Cron enrollment-start failed', err);
    return NextResponse.json({ success: false, error: String(err) });
  }
}

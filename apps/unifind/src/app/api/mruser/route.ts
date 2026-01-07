// apps/unifind/src/app/api/mruser/route.ts
import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email болон Name шаардлагатай' }, { status: 400 });
    }

    // MRUser хайж олно
    let user = await prisma.mrusers.findUnique({
      where: { email },
    });

    // Олдохгүй бол шинээр үүсгэнэ
    if (!user) {
      user = await prisma.mrusers.create({
        data: {
          email,
          name,
          password_hash: '', // required тул хоосон string өгч байна
        },
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error('MRUser API алдаа:', err);
    return NextResponse.json({ error: 'MRUser үүсгэхэд алдаа гарлаа' }, { status: 500 });
  }
}

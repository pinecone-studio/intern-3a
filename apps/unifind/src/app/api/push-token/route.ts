// app/api/push-token/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, token } = body;

    if (!user_id || !token) {
      return NextResponse.json({ message: 'Missing user_id or token' }, { status: 400 });
    }

    // Token аль хэдийн байгаа эсэхийг шалгах
    const existing = await prisma.push_tokens.findUnique({
      where: { token },
    });

    if (existing) {
      // Хэрэглэгч өөрчлөгдөж байвал update
      await prisma.push_tokens.update({
        where: { token },
        data: { user_id },
      });
      return NextResponse.json({ message: 'Token updated' }, { status: 200 });
    }

    // Шинээр хадгалах
    const pushToken = await prisma.push_tokens.create({
      data: {
        user_id,
        token,
      },
    });

    return NextResponse.json({ message: 'Token saved', pushToken }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

//Бүх хэрэглэгчийн мэдээллийг авах API

export async function GET() {
  try {
    const { userId, sessionClaims } = await auth();

    console.log('userId:', userId);
    console.log('sessionClaims:', sessionClaims);

    const allusers = await prisma.user.findMany();

    return NextResponse.json({ allusers });
  } catch (error: any) {
    console.error('Prisma Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

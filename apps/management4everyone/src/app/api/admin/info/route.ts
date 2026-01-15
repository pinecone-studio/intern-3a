import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

//Бүх хэрэглэгчийн мэдээллийг авах API
export async function GET() {
  try {
    const allusers = await prisma.user.findMany();

    return NextResponse.json({ allusers });
  } catch (error: any) {
    console.error('Prisma Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

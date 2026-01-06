
import prisma from 'apps/unifind/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
   
    const categories = await prisma.majorcategories.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
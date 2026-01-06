import prisma from "apps/unifind/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const categoriesStr = searchParams.get('categories') || '';
    const categoryIds = categoriesStr ? categoriesStr.split(',').map(id => parseInt(id)) : [];

    const where: any = {};
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }
    
    // Хэрэв категори сонгосон бол тухайн категорийн мэргэжилтэй сургуулиудыг шүүнэ
    if (categoryIds.length > 0) {
      where.majors = {
        some: {
          category_id: { in: categoryIds }
        }
      };
    }

    const universities = await prisma.universities.findMany({
      where: where,
      include: {
        majors: {
          include: {
            major_categories: true
          },
        },
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(universities);
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  const body = await req.json();

  const university = await prisma.universities.create({
    data: {
      name: body.name,
      city: body.city,
      description: body.description,
      website: body.website,
    },
  });

  return NextResponse.json(university);
}


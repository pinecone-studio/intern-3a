import { getClubById } from '@/lib/services/club-service';
import { NextResponse } from 'next/server';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const club = await getClubById(id);

    if (!club) {
      return NextResponse.json({ message: 'Club not found' }, { status: 404 });
    }

    return NextResponse.json({ data: club });
  } catch (error) {
    console.error('Error loading club:', error);
    return NextResponse.json({ message: 'Error while loading club' }, { status: 500 });
  }
}

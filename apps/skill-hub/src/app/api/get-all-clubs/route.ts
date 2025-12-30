import { getAllClubs } from '@/lib/services/club-service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allClubs = await getAllClubs();

    if (!allClubs) {
      return NextResponse.json({ message: 'No clubs' }, { status: 404 });
    }

    return NextResponse.json({ data: allClubs });
  } catch (error) {
    console.error('Error', error);
    return NextResponse.json({ message: 'Error while loading', error });
  }
}

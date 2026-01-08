import { FavoriteClub } from '@/lib/models/FavoriteClub';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { createFavoriteClubs } from '@/lib/services/favorite-service';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '../check-create-user/route';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userClerkId } = result;

    const user = await User.findOne({ userClerkId: userClerkId });

    const { clubId } = await req.json();

    if (!clubId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userId = user._id;

    const existing = await FavoriteClub.findOne({ clubId, userId });
    if (existing) {
      return NextResponse.json({ message: 'Already saved to favorites' }, { status: 200 });
    }

    let favoriteClub;

    if (user.userStatus !== 'GENERAL') {
      return NextResponse.json({ message: 'Forbidden: Only logged user can save clubs to favorite clubs' }, { status: 403 });
    } else {
      favoriteClub = await createFavoriteClubs(clubId, userId);
    }

    return NextResponse.json({ message: 'Favorite club saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error while saving favorite club', error);
    return NextResponse.json({ message: 'Failed to save favorite club info' }, { status: 500 });
  }
}

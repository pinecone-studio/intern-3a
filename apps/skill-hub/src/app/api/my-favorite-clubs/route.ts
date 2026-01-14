import { NewClub } from '@/lib/models/Club';
import { FavoriteClub } from '@/lib/models/FavoriteClub';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { createFavoriteClubs } from '@/lib/services/favorite-service';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { userId: userClerkId } = await auth();

    if (!userClerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findOne({ userClerkId: userClerkId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const favoriteClubsRaw = await FavoriteClub.find({ userId: user._id }).sort({ createdAt: -1 });

    const favoriteClubs = await Promise.all(
      favoriteClubsRaw.map(async (fav) => {
        const club = await NewClub.findById(fav.clubId);
        return {
          ...fav.toObject(),
          clubId: club,
        };
      }),
    );

    return NextResponse.json({ favoriteClubs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching favorite clubs:', error);
    return NextResponse.json({ message: 'Failed to fetch favorite clubs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId: userClerkId } = await auth();

    if (!userClerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

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

    if (user.userStatus !== 'GENERAL') {
      return NextResponse.json({ message: 'Forbidden: Only logged user can save clubs to favorite clubs' }, { status: 403 });
    }

    await createFavoriteClubs(clubId, userId);

    return NextResponse.json({ message: 'Favorite club saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error while saving favorite club', error);
    return NextResponse.json({ message: 'Failed to save favorite club info' }, { status: 500 });
  }
}

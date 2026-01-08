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

    // Ensure NewClub model is registered
    console.log('NewClub model registered:', NewClub.modelName);

    const { userId: userClerkId } = await auth();
    console.log('GET /api/my-favorite-clubs - User Clerk ID:', userClerkId);

    if (!userClerkId) {
      console.log('GET /api/my-favorite-clubs - Unauthorized');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('GET /api/my-favorite-clubs - Looking up user with Clerk ID:', userClerkId);

    const user = await User.findOne({ userClerkId: userClerkId });
    console.log('GET /api/my-favorite-clubs - User found:', user ? user._id : 'null');

    if (!user) {
      console.log('GET /api/my-favorite-clubs - User not found in DB');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get all favorite clubs for this user
    const favoriteClubsRaw = await FavoriteClub.find({ userId: user._id }).sort({ createdAt: -1 });
    console.log('GET /api/my-favorite-clubs - Found favorite clubs (raw):', favoriteClubsRaw.length);

    // Manually populate club data to avoid schema registration issues
    const favoriteClubs = await Promise.all(
      favoriteClubsRaw.map(async (fav) => {
        const club = await NewClub.findById(fav.clubId);
        return {
          ...fav.toObject(),
          clubId: club,
        };
      }),
    );

    console.log('GET /api/my-favorite-clubs - Found favorite clubs:', favoriteClubs.length);
    console.log('GET /api/my-favorite-clubs - Favorite clubs data:', favoriteClubs);

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

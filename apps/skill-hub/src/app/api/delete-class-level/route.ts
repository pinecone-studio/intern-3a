import { NewClub } from '@/lib/models/Club';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { createUser } from '@/lib/services/user-service';
import { auth } from '@clerk/nextjs/server';
import Ably from 'ably';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Зөвшөөрөлгүй оролдлого!' }, { status: 401 });
    }

    let user = await User.findOne({ userClerkId: clerkUserId });
    const status = 'GENERAL';

    if (!user) {
      user = await createUser(clerkUserId, status);
    } else if (user.userStatus !== status) {
      user.userStatus = status as 'ADMIN' | 'GENERAL';
      await user.save();
    }

    const mongoUserId = user._id;

    const body = await req.json();
    const { clubId, classLevel } = body;

    if (!clubId || !classLevel) {
      return NextResponse.json({ error: 'clubId болон classLevel байхгүй байна.' }, { status: 400 });
    }

    const updatedClub = await NewClub.findOneAndUpdate(
      { _id: clubId, adminId: mongoUserId },
      {
        $pull: { selectedClassLevelNames: classLevel },
        $unset: {
          [`clubPrices.${classLevel}`]: '',
          [`scheduledClubTimes.${classLevel}`]: '',
          [`teachersInfoByClass.${classLevel}`]: '',
        },
      },
      { new: true },
    );

    if (!updatedClub) {
      return NextResponse.json({ error: 'Дугуйлан олдсонгүй' }, { status: 404 });
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('clubs').publish('club-updated', updatedClub);

    return NextResponse.json({ success: true, updatedClub });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ангилал устгахад алдаа гарлаа' }, { status: 500 });
  }
}

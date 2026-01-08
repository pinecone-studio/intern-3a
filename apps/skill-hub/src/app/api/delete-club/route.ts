import { NewClub } from '@/lib/models/Club';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { createUser } from '@/lib/services/user-service';
import { auth } from '@clerk/nextjs/server';
import Ably from 'ably';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Зөвшөөрөлгүй оролдлого!' }, { status: 401 });
    }

    let user = await User.findOne({ userClerkId: clerkUserId });
    if (!user) {
      user = await createUser(clerkUserId, 'GENERAL');
    } else if (user.userStatus !== 'ADMIN' && user.userStatus !== 'GENERAL') {
      user.userStatus = 'GENERAL';
      await user.save();
    }

    const { searchParams } = new URL(req.url);
    const clubId = searchParams.get('clubId');
    if (!clubId) {
      return NextResponse.json({ error: 'clubId байхгүй байна.' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      return NextResponse.json({ error: 'Хуурамч clubId байна.' }, { status: 400 });
    }

    const deleteClub = await NewClub.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(clubId),
      adminId: user._id,
    });

    if (!deleteClub) {
      return NextResponse.json({ error: 'Дугуйлан олдсонгүй эсвэл та админ биш байна.' }, { status: 404 });
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('clubs').publish('club-deleted', { _id: clubId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Дугуйлан устгахад алдаа гарлаа' }, { status: 500 });
  }
}

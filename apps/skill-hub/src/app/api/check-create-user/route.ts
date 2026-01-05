import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { createUser } from '@/lib/services/user-service';
import { verifyToken } from '@clerk/backend';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get('Authorization');
  const authToken = auth?.split(' ')[1];

  if (!authToken) {
    return false;
  }

  try {
    const { sub, role } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    return { userClerkId: sub, role };
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const POST = async () => {
  await connectDB();
  const result = await checkAuth();

  if (!result) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { userClerkId, role } = result;
  const status = role || 'GENERAL';

  let user = await User.findOne({ userClerkId: userClerkId });

  if (!user) {
    user = await createUser(userClerkId as string, status as string);
  } else if (user.userStatus !== status) {
    user.userStatus = status as 'ADMIN' | 'GENERAL';
    await user.save();
  }
  if (!user) {
    return NextResponse.json({ message: 'Failed to check or create user!' }, { status: 500 });
  }

  return NextResponse.json({ message: 'User checked or created successfully', userId: user._id });
};

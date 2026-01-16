import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST() {
  const { userId } = auth();

  console.log('userId irj bnu', userId);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const email = clerkUser.primaryEmailAddress?.emailAddress;
  if (!email) {
    return NextResponse.json({ message: 'Email not found' }, { status: 400 });
  }

  await prisma.user.upsert({
    where: { clerkUserId: userId },
    update: {
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      updatedAt: new Date(),
    },
    create: {
      id: userId,
      clerkUserId: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      role: (clerkUser.publicMetadata.role as 'ADMIN' | 'WORKER') ?? 'WORKER',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}

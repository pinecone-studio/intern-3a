'use server';

import { createClerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import prisma from '../lib/prisma';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function approveUserAction(userId: string) {
  try {
    // 1. Clerk дээрх мэдээллийг авах
    const clerkUser = await clerkClient.users.getUser(userId);

    // 2. Clerk Metadata-г шинэчлэх (approved: true)
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        approved: true,
        role: 'WORKER', // Шаардлагатай бол өөрчилж болно
      },
    });

    // 3. Өөрийн Postgres бааз руу хадгалах (Sync)
    await prisma.user.upsert({
      where: { clerkUserId: userId },
      update: {
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        // status: 'ACTIVE',
      },
      create: {
        id: userId,
        clerkUserId: userId,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        role: 'WORKER',
        // status: 'ACTIVE',
      },
    });

    revalidatePath('/admin/users'); // Жагсаалтыг шинэчлэх
    return { success: true };
  } catch (error) {
    console.error('Approve алдаа:', error);
    return { success: false, error: 'Зөвшөөрөл өгөхөд алдаа гарлаа' };
  }
}

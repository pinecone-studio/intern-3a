import { User } from 'node_modules/@clerk/backend/dist/api';
import prisma from './prisma';
export async function createOrGetMRUser(clerkUser: User) {
  const email = clerkUser.emailAddresses?.[0]?.emailAddress;
  if (!email) throw new Error('Clerk user-д email байхгүй байна');

  const existing = await prisma.mrusers.findUnique({ where: { email } });
  if (existing) return existing;

  return prisma.mrusers.create({
    data: {
      email,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      password_hash: '', // Clerk ашиглаж байгаа тул хоосон байж болно
    },
  });
}

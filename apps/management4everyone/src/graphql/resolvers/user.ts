// apps/management4everyone/src/graphql/resolvers/user.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';
import { requireAuth } from '../../lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export const userResolvers = {
  Query: {
    // Бүх хэрэглэгчийн мэдээлэл
    allUsers: async (_parent: any, _args: any, ctx: any) => {
      requireAuth(ctx);

      return prisma.user.findMany({
        select: {
          id: true,
          clerkUserId: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });
    },

    // Зөвхөн session-тэй хэрэглэгч
    me: async (_parent: any, _args: any, ctx: any) => {
      const userId = ctx.userId;
      requireAuth(ctx);

      if (!userId) return null;

      return prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          clerkUserId: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });
    },
  },

  Mutation: {
    // Өөрийн мэдээллийг шинэчлэх
    updateMe: async (_parent: any, args: any, ctx: any) => {
      const userId = ctx.userId;
      requireAuth(ctx);

      const { firstName, lastName } = args.input;

      return prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          clerkUserId: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          departmentId: true,
          Department: true,
        },
      });
    },
  },
};

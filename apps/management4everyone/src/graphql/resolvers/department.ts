// apps/management4everyone/src/graphql/resolvers/department.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';
import { requireAuth, requireRole } from '../../lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export const departmentResolvers = {
  Query: {
    //  бүх хэлтэс
    departments: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);

      return prisma.department.findMany({
        orderBy: { id: 'asc' },
      });
    },

    // 🔒 ADMIN – нэг хэлтэс
    department: async (_: any, args: { id: number }, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      return prisma.department.findUnique({
        where: { id: args.id },
      });
    },
    myDepartment: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);
      const user = await prisma.user.findUnique({
        where: { id: ctx.userId },
        select: { department: true },
      });
      if (!user || !user.department) return null;
      return prisma.department.findUnique({
        where: { id: user.department.id },
      });
    },
  },

  Mutation: {
    // 🔒ADMIN - шинэ хэлтэс нэмэх
    createDepartment: async (_: any, args: { input: { name: string } }, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      return prisma.department.create({
        data: {
          name: args.input.name,
        },
      });
    },

    // 🔒 ADMIN – засах
    updateDepartment: async (_: any, args: { id: number; input: { name: string } }, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      return prisma.department.update({
        where: { id: args.id },
        data: {
          name: args.input.name,
          updatedAt: new Date(),
        },
      });
    },

    // 🔒 ADMIN – устгах
    deleteDepartment: async (_: any, args: { id: number }, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      await prisma.department.delete({
        where: { id: args.id },
      });

      return true;
    },

    // 🔒 ADMIN – Ажилтанд хэлтэс оноох
    assignUserDepartment: async (_: any, args: { userId: string; departmentId: number }, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      // prisma.user.update нь User обьект буцаадаг
      await prisma.user.update({
        where: { id: args.userId },
        data: {
          departmentId: args.departmentId,
          updatedAt: new Date(),
        },
      });

      // Schema дээр Boolean! гэж заасан тул заавал true/false буцаах ёстой
      return true;
    },
  },
};

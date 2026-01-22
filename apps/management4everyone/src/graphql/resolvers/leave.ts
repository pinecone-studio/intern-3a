import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';
import { requireAuth, requireRole } from '../../lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const leaveResolvers = {
  Query: {
    // 🔒 ADMIN - Систем дээрх бүх чөлөөний хүсэлтүүд
    allLeaves: async (_: any, __: any, ctx: any) => {
      requireRole(ctx, 'ADMIN');
      return prisma.leave.findMany({
        include: { User: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    // 👤 USER - Зөвхөн нэвтэрсэн хэрэглэгчийн хүсэлтүүд
    myLeaves: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);
      return prisma.leave.findMany({
        where: { userId: ctx.userId },
        orderBy: { createdAt: 'desc' },
      });
    },
  },

  Mutation: {
    // 👤 USER - Хүсэлт явуулах
    createLeave: async (_: any, args: { input: any }, ctx: any) => {
      requireAuth(ctx);

      const { startDate, endDate, reason } = args.input;

      return prisma.leave.create({
        data: {
          userId: ctx.userId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          reason,
          status: 'PENDING',
        },
      });
    },

    // 🔒 ADMIN - Төлөв өөрчлөх
    updateLeaveStatus: async (_: any, args: { id: number; status: any }, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      return prisma.leave.update({
        where: { id: args.id },
        data: {
          status: args.status,
          updatedAt: new Date(),
        },
      });
    },

    // Хэрэглэгчийн хүсэлтээ устгах
    deleteLeave: async (_: any, args: { id: number }, ctx: any) => {
      requireAuth(ctx);

      // Хүсэлт байгаа эсэхийг шалгах
      const leave = await prisma.leave.findUnique({
        where: { id: args.id },
      });

      if (!leave) {
        throw new Error("Хүсэлт олдсонгүй.");
      }

      // Зөвхөн өөрийнхөө хүсэлтийг эсвэл ADMIN устгах боломжтой болгох
      if (leave.userId !== ctx.userId && ctx.role !== 'ADMIN') {
        throw new Error("Танд энэ хүсэлтийг устгах эрх байхгүй.");
      }

      return prisma.leave.delete({
        where: { id: args.id },
      });
    },
  },

  // Field Resolver: Leave объект доторх User-ийг жижиг "user" талбарт холбох
  Leave: {
    user: (parent: any) => {
      if (parent.User) return parent.User;
      return prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
};

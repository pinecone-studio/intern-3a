import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';
import { requireAuth, requireRole } from '../../lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const attendanceResolvers = {
  Query: {
    // 👤 WORKER – өөрийн ирц
    myAttendances: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);

      return prisma.attendance.findMany({
        where: { userId: ctx.userId },
        orderBy: { date: 'desc' },
        include: { User: true },
      });
    },

    // 🔒 ADMIN – бүх ажилтны ирц
    attendances: async (_: any, args: any, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      const { filter } = args;

      return prisma.attendance.findMany({
        where: {
          userId: filter?.userId ?? undefined,
          date: {
            gte: filter?.fromDate ? new Date(filter.fromDate) : undefined,
            lte: filter?.toDate ? new Date(filter.toDate) : undefined,
          },
        },
        orderBy: { date: 'desc' },
        include: {
          User: { include: { department: true } },
        },
      });
    },
  },

  Mutation: {
    // 👤 WORKER – ирц нээх
    clockIn: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);

      const existing = await prisma.attendance.findUnique({
        where: {
          userId_date: {
            userId: ctx.userId,
            date: today(),
          },
        },
      });

      if (existing) {
        throw new Error('Өнөөдрийн ирц аль хэдийн бүртгэгдсэн байна');
      }

      return prisma.attendance.create({
        data: {
          userId: ctx.userId,
          date: today(),
          clockIn: new Date(),
        },
        include: { User: true },
      });
    },

    // 👤 WORKER – тарах
    clockOut: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);

      const attendance = await prisma.attendance.findUnique({
        where: {
          userId_date: {
            userId: ctx.userId,
            date: today(),
          },
        },
      });

      if (!attendance) {
        throw new Error('Өнөөдрийн ирц олдсонгүй');
      }

      if (attendance.clockOut) {
        throw new Error('Тарах цаг аль хэдийн бүртгэгдсэн байна');
      }

      return prisma.attendance.update({
        where: { id: attendance.id },
        data: { clockOut: new Date() },
        include: { User: true },
      });
    },
  },

  Attendance: {
    user: (parent: any) => {
      // Prisma-аас ирэхдээ 'User' эсвэл 'user' гэж ирж байгааг хоёуланг нь шалгах
      const userData = parent.User || parent.user;

      if (!userData) {
        console.error(`DATA ERROR: Attendance ID ${parent.id} has userId ${parent.userId} but NO User found in database!`);
        return null; // Хэрэв TypeDefs дээр ! байгаа бол энд null буцаахад алдаа заасан хэвээр байна
      }
      return userData;
    },
  },
};

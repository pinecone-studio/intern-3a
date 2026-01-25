// apps/management4everyone/src/graphql/resolvers/user.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';
import { requireAuth, requireRole } from '../../lib/auth';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const userResolvers = {
  Query: {
    // Бүх хэрэглэгчийн мэдээлэл (зөвхөн ADMIN)
    allUsers: async (_parent: any, _args: any, ctx: any) => {
      requireRole(ctx, 'ADMIN');

      return prisma.user.findMany({
        // 'select' ба 'include'-ийг хамт ашиглаж болохгүй.
        // Бүх талбарыг аваад холбоост хүснэгтийг авахдаа 'include' ашиглах нь илүү тохиромжтой.
        include: { department: true },
      });
    },

    // Зөвхөн session-тэй хэрэглэгч
    me: async (_parent: any, _args: any, ctx: any) => {
      requireAuth(ctx);
      const userId = ctx.userId;

      if (!userId) return null;

      return prisma.user.findUnique({
        where: { id: userId },
        include: { department: true },
      });
    },
  },

  Mutation: {
    // Өөрийн мэдээллийг шинэчлэх
    updateMe: async (_parent: any, args: any, ctx: any) => {
      requireAuth(ctx);
      const userId = ctx.userId;

      const { firstName, lastName } = args.input;

      return prisma.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          updatedAt: new Date(),
        },
        include: { department: true },
      });
    },
  },

  // 🔥 ХАМГИЙН ЧУХАЛ ХЭСЭГ
  User: {
    // GraphQL схем дээр 'department' (жижиг) гэж байгаа тул энд холбож өгнө
    department: (parent: any) => {
      // 1. Хэрэв parent (Prisma хариу) дотор 'Department' (том) аль хэдийн include хийгдсэн бол шууд буцаана
      if (parent.Department) return parent.Department;

      // 2. Хэрэв байхгүй бол departmentId-аар нь баазаас хайна
      if (!parent.departmentId) return null;

      return prisma.department.findUnique({
        where: { id: parent.departmentId },
      });
    },
    // 💡 Энд заавал async/await ашиглаад, үр дүнг массив эсэхийг баталгаажуулна
    attendances: async (parent: any) => {
      const data = await prisma.attendance.findMany({
        where: { userId: parent.id },
        orderBy: { date: 'desc' },
      });
      return data || []; // null-ийн оронд [] буцаана
    },

    leaves: async (parent: any) => {
      const data = await prisma.leave.findMany({
        where: { userId: parent.id },
        orderBy: { createdAt: 'desc' },
      });
      return data || []; // null-ийн оронд [] буцаана
    },
  },
};

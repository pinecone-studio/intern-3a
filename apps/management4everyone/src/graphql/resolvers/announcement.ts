import { requireAuth, requireRole } from 'apps/management4everyone/src/lib/auth';

export const announcementResolvers = {
  Query: {
    announcements: async (_: any, __: any, ctx: any) => {
      requireAuth(ctx);

      return ctx.db.announcement.findMany({
        orderBy: { createdAt: 'desc' },
      });
    },

    announcement: async (_: any, args: { id: number }, ctx: any) => {
      requireAuth(ctx);

      return ctx.db.announcement.findUnique({
        where: { id: args.id },
      });
    },
  },

  Mutation: {
    createAnnouncement: async (_: any, args: { title: string; content: string }, ctx: any) => {
      requireAuth(ctx);
      requireRole(ctx, 'ADMIN');

      return ctx.db.announcement.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },

    updateAnnouncement: async (_: any, args: { id: number; title: string; content: string }, ctx: any) => {
      requireAuth(ctx);
      requireRole(ctx, 'ADMIN');

      return ctx.db.announcement.update({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },

    deleteAnnouncement: async (_: any, args: { id: number }, ctx: any) => {
      requireAuth(ctx);
      requireRole(ctx, 'ADMIN');

      await ctx.db.announcement.delete({
        where: { id: args.id },
      });

      return true;
    },
  },
};

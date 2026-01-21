//apps/management4everyone/src/graphql/resolvers/index.ts
import { announcementResolvers } from './announcement';
import { attendanceResolvers } from './attendance';
import { departmentResolvers } from './department';
import { userResolvers } from './user';

export const resolvers = {
  Query: {
    ...announcementResolvers.Query,
    ...userResolvers.Query,
    ...departmentResolvers.Query,
    ...attendanceResolvers.Query,
  },
  Mutation: {
    ...announcementResolvers.Mutation,
    ...userResolvers.Mutation,
    ...departmentResolvers.Mutation,
    ...attendanceResolvers.Mutation,
  },
};

//apps/management4everyone/src/graphql/resolvers/index.ts
import { announcementResolvers } from './announcement';

export const resolvers = {
  Query: {
    ...announcementResolvers.Query,
  },
  Mutation: {
    ...announcementResolvers.Mutation,
  },
};

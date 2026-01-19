import { announcementResolvers } from './announcement';

export const resolvers = {
  Query: {
    ...announcementResolvers.Query,
  },
  Mutation: {
    ...announcementResolvers.Mutation,
  },
};

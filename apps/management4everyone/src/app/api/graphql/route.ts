import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { auth } from '@clerk/nextjs/server';
import { resolvers } from 'apps/management4everyone/src/graphql/resolvers';
import { typeDefs } from 'apps/management4everyone/src/graphql/schema';

import prisma from '../../lib/prisma';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const { userId, sessionClaims } = await auth();

    return {
      userId,
      sessionClaims,
      role: sessionClaims?.metadata?.role,
      db: prisma,
    };
  },
});

export { handler as GET, handler as POST };

//app/src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { auth } from '@clerk/nextjs/server';
import { resolvers } from 'apps/management4everyone/src/graphql/resolvers';
import { typeDefs } from 'apps/management4everyone/src/graphql/schema';

import prisma from '../../lib/prisma';

export const dynamic = 'force-dynamic';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: any) => {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      console.warn('WARNING: Request received without valid session');
    }

    return {
      userId,
      sessionClaims,
      role: sessionClaims?.metadata?.role,
      db: prisma,
    };
  },
});

export { handler as GET, handler as POST };

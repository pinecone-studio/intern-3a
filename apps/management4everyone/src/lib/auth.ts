// apps/management4everyone/src/lib/auth.ts
import { GraphQLError } from 'graphql';

export function requireAuth(ctx: any) {
  if (!ctx.userId) {
    throw new GraphQLError('User is not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
}

export function requireRole(ctx: any, role: 'ADMIN' | 'WORKER') {
  const userRole = ctx.sessionClaims?.metadata?.role;
  console.log("what's user's role", userRole);
  if (userRole !== role) {
    throw new Error('FORBIDDEN');
  }
}

export function requireAuth(ctx: any) {
  if (!ctx.userId) {
    throw new Error('UNAUTHORIZED');
  }
}

export function requireRole(ctx: any, role: 'ADMIN' | 'WORKER') {
  const userRole = ctx.sessionClaims?.metadata?.role;
  console.log("what's user's role", userRole);
  if (userRole !== role) {
    throw new Error('FORBIDDEN');
  }
}

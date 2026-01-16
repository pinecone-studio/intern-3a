// apps/management4everyone/lib/prisma.ts

// Instead of: import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

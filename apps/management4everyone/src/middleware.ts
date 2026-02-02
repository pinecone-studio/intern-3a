//apps/management4everyone/src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 1. TypeScript-д sessionClaims-ийн бүтцийг таниулах
declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      approved?: boolean;
      role?: string;
    };
  }
}

const isProtectedRoute = createRouteMatcher(['/employee(.*)', '/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 1. Хэрэв хамгаалагдсан зам руу хандаж байвал
  if (isProtectedRoute(req)) {
    // Хэрэв хэрэглэгч нэвтрээгүй бол Clerk өөрөө login руу шилжүүлнэ.
    // Хэрэв нэвтэрсэн бол metadata-г шалгана.
    if (userId) {
      const isApproved = sessionClaims?.metadata?.approved;

      if (!isApproved) {
        // Одоо байгаа зам нь хүлээх хуудас биш бол тийшээ шилжүүлнэ
        if (req.nextUrl.pathname !== '/waiting-approval') {
          const approvalUrl = new URL('/waiting-approval', req.url);
          return NextResponse.redirect(approvalUrl);
        }
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // /api/webhooks/clerk замыг middleware-ээс бүрэн чөлөөлөх
    '/((?!_next|api/webhooks/clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

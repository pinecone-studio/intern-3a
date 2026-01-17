//apps/management4everyone/src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 1. TypeScript-д sessionClaims-ийн бүтцийг таниулах
declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      approved?: boolean;
    };
  }
}

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // Хамгаалагдсан зам мөн эсэхийг шалгах
  if (isProtectedRoute(req)) {
    // metadata-г төрөлжүүлсэн тул одоо алдаа заахгүй
    const isApproved = sessionClaims?.metadata?.approved;

    if (!isApproved) {
      const approvalUrl = new URL('/waiting-approval', req.url);
      return NextResponse.redirect(approvalUrl);
    }
  }

  // 2. Хэрэв дээрх нөхцөлүүд биелээгүй бол хэвийн үргэлжлүүлнэ
  // "Not all code paths return a value" алдааг засаж байна
  return NextResponse.next();
});

export const config = {
  matcher: [
    // /api/webhooks/clerk замыг middleware-ээс бүрэн чөлөөлөх
    '/((?!_next|api/webhooks/clerk|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

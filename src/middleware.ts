import { getSessionCookie } from "better-auth/cookies";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = new Set([
  "/",
  "/about",
  "/contact",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
]);

const translationMiddleware = createI18nMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export default async function middleware(request: NextRequest) {
  const response = translationMiddleware(request);

  const isPublicRoute = checkPublicRoute(request);
  const session = getSessionCookie(request, {
    cookieName: "enterprise_session",
    cookiePrefix: "",
  });
  if (!isPublicRoute || !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return response ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

const checkPublicRoute = (request: NextRequest): boolean => {
  const nextUrl = request.nextUrl;

  const pathnameLocale = nextUrl.pathname.split("/", 2)?.[1];
  const pathnameWithoutLocale = pathnameLocale
    ? nextUrl.pathname.slice(pathnameLocale.length + 1)
    : nextUrl.pathname;
  return publicRoutes.has(pathnameWithoutLocale);
};


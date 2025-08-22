import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getSessionMiddleware } from "./contexts/shared/infrastructure/auth/utils";

const publicRoutes = new Set([
  "/",
  "/about",
  "/contact",
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/verify-reset",
  "/verify",
  "/start-organization",
]);

const translationMiddleware = createI18nMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export default async function middleware(request: NextRequest) {
  const response = translationMiddleware(request);

  const isPublicRoute = checkPublicRoute(request);
  const session = await getSessionMiddleware(request);
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return response ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|tasks|webhooks|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|yml)$).*)",
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

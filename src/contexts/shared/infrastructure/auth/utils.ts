import { betterFetch } from "@better-fetch/fetch";
import { NextRequest } from "next/server";
import { BetterSession } from "./server";

export async function getSessionMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<BetterSession>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
    },
  });
  return session;
}

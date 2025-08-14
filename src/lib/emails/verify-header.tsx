import { NextRequest } from "next/server";
import { env } from "../env";

export function verifyHeader(req: NextRequest): void {
  const headers = req.headers;

  const notificationsKey = headers.get("x-notifications-key");
  if (!notificationsKey || notificationsKey !== env.NOTIFICATIONS_API_KEY) {
    throw new Error("Invalid or missing notifications API key");
  }
}

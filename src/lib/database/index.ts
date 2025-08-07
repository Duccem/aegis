import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env";
import * as schema from "./schema/_index";

export const database = drizzle(env.DATABASE_URL, { schema });

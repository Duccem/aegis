import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env";
import * as schema from "./schema";

const client = postgres(env.DATABASE_URL);

export const database = drizzle(client, { schema });

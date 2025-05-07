import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

console.log("database url", process.env.DATABASE_URL);
const sql = neon(
  "postgresql://resumedb_owner:npg_BF5LuM7zOlXg@ep-dry-math-a54z790f-pooler.us-east-2.aws.neon.tech/resumedb?sslmode=require",
);
export const db = drizzle(sql, { schema });

import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://resumedb_owner:npg_BF5LuM7zOlXg@ep-dry-math-a54z790f-pooler.us-east-2.aws.neon.tech/resumedb?sslmode=require",
  },
});

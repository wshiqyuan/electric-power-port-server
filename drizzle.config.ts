import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is required.");
}

export default defineConfig({
	casing: "snake_case",
	out: "./drizzle",
	dialect: "mysql",
	schema: "./src/db/schema",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	verbose: true,
});

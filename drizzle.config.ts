import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DB_FILE_NAME) {
	throw new Error("DB_FILE_NAME environment variable is required.");
}

export default defineConfig({
	casing: "snake_case",
	out: "./drizzle",
	dialect: "sqlite",
	schema: "./src/db/schema",
	dbCredentials: {
		url: process.env.DB_FILE_NAME,
	},
	strict: true,
	verbose: true,
});

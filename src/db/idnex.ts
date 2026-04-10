import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is required.");
}

const db = drizzle({
	connection: process.env.DATABASE_URL,
	casing: "snake_case",
});

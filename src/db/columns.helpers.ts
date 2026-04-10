import { timestamp } from "drizzle-orm/mysql-core";

export const timestamps = {
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow().onUpdateNow(),
};

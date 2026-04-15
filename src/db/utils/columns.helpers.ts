import { int, timestamp } from "drizzle-orm/mysql-core";

export const timestamps = {
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow().onUpdateNow(),
};

export function tableId() {
	return int().autoincrement().primaryKey();
}

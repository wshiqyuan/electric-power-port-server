import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

export const timestamps = {
	createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text()
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
};

export function tableId() {
	return int().primaryKey({ autoIncrement: true });
}

import {
	index,
	int,
	mysqlTable,
	serial,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { timestamps } from "../columns.helpers";

export const menuConfig = mysqlTable(
	"menu_config",
	{
		id: serial().primaryKey(),
		parentId: int().notNull(),
		name: varchar({ length: 50 }).notNull(),
		url: varchar({ length: 100 }).notNull(),
		icon: varchar({ length: 50 }).notNull(),
		sortOrder: int().notNull(),
		status: tinyint().default(1),
		...timestamps,
	},
	(t) => [index("idx_parent").on(t.parentId), index("idx_status").on(t.status)],
);

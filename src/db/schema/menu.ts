import {
	index,
	int,
	mysqlTable,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { timestamps } from "../columns.helpers";

export const menuConfig = mysqlTable(
	"menu_config",
	{
		id: int().autoincrement().primaryKey(),
		parentId: int(),
		name: varchar({ length: 50 }).notNull(),
		url: varchar({ length: 100 }).notNull(),
		icon: varchar({ length: 50 }).notNull(),
		sortOrder: int().notNull(),
		status: tinyint().default(1),
		...timestamps,
	},
	(t) => [index("idx_parent").on(t.parentId), index("idx_status").on(t.status)],
);

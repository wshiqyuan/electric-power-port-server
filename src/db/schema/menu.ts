import {
	index,
	int,
	mysqlTable,
	tinyint,
	varchar,
} from "drizzle-orm/mysql-core";
import { tableId, timestamps } from "../utils/columns.helpers";

export const menuConfig = mysqlTable(
	"menu_config",
	{
		id: tableId(),
		parentId: int(),
		name: varchar({ length: 50 }).notNull(),
		url: varchar({ length: 100 }).notNull(),
		icon: varchar({ length: 50 }).notNull(),
		sortOrder: int().notNull(),
		isDeleted: tinyint().default(0), // 数据状态 0: 未删除, 1: 已删除
		...timestamps,
	},
	(t) => [
		index("idx_parent").on(t.parentId),
		index("idx_deleted").on(t.isDeleted),
	],
);

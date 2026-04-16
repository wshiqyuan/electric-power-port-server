import {
	index,
	int,
	sqliteTable as table,
	text,
} from "drizzle-orm/sqlite-core";
import { tableId, timestamps } from "../utils/columns.helpers";

export const menuConfig = table(
	"menu_config",
	{
		id: tableId(),
		parentId: int(), // 父级菜单id
		name: text({ length: 50 }).notNull(), // 菜单名称
		url: text({ length: 100 }).notNull(), // 路由
		icon: text({ length: 50 }).notNull(), // 图标
		sortOrder: int().notNull(), // 排序
		isDeleted: int().default(0), // 数据状态 0: 未删除, 1: 已删除
		...timestamps,
	},
	(t) => [
		index("idx_menu_config_parent").on(t.parentId),
		index("idx_menu_config_deleted").on(t.isDeleted),
	],
);

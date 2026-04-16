import {
	index,
	int,
	mysqlTable,
	tinyint,
	unique,
	varchar,
} from "drizzle-orm/mysql-core";
import { tableId, timestamps } from "../utils/columns.helpers";
import { menuConfig } from "./menu";
import { usersTable } from "./users";

export const roleMenuPermissions = mysqlTable(
	"role_menu_permissions",
	{
		id: tableId(),
		role: varchar({ length: 50 }).notNull(), // 角色名称
		menuId: int()
			.notNull()
			.references(() => menuConfig.id, { onDelete: "cascade" }), // 菜单id
		enabled: tinyint().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		unique("uk_role_menu").on(t.role, t.menuId),
		index("idx_role").on(t.role),
	],
);

export const userMenuPermissions = mysqlTable(
	"user_menu_permissions",
	{
		id: tableId(),
		userId: varchar({ length: 255 })
			.notNull()
			.references(() => usersTable.userId, { onDelete: "cascade" }), // 用户id
		menuId: int()
			.notNull()
			.references(() => menuConfig.id, { onDelete: "cascade" }), // 菜单id
		enabled: tinyint().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		index("idx_user_id").on(t.userId),
		unique("uk_user_menu").on(t.userId, t.menuId),
	],
);

export const roleButtonPermissions = mysqlTable(
	"role_button_permissions",
	{
		id: tableId(),
		role: varchar({ length: 50 }).notNull(), // 角色名称
		buttonKey: varchar({ length: 50 }).notNull(), // 按钮key
		enabled: tinyint().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		unique("uk_role_button").on(t.role, t.buttonKey),
		index("idx_role").on(t.role),
	],
);

export const userButtonPermissions = mysqlTable(
	"user_button_permissions",
	{
		id: tableId(),
		userId: varchar({ length: 255 })
			.notNull()
			.references(() => usersTable.userId, { onDelete: "cascade" }), // 用户id
		buttonKey: varchar({ length: 50 }).notNull(), // 按钮key
		enabled: tinyint().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		unique("uk_user_button").on(t.userId, t.buttonKey),
		index("idx_user_id").on(t.userId),
	],
);

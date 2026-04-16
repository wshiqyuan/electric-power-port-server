import {
	index,
	int,
	sqliteTable as table,
	text,
	unique,
} from "drizzle-orm/sqlite-core";
import { tableId, timestamps } from "../utils/columns.helpers";
import { menuConfig } from "./menu";
import { usersTable } from "./users";

export const roleMenuPermissions = table(
	"role_menu_permissions",
	{
		id: tableId(),
		role: text({ length: 50 }).notNull(), // 角色名称
		menuId: int()
			.notNull()
			.references(() => menuConfig.id, { onDelete: "cascade" }), // 菜单id
		enabled: int().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		unique("uk_role_menu").on(t.role, t.menuId),
		index("idx_role_menu_permissions_role").on(t.role),
	],
);

export const userMenuPermissions = table(
	"user_menu_permissions",
	{
		id: tableId(),
		userId: text({ length: 255 })
			.notNull()
			.references(() => usersTable.userId, { onDelete: "cascade" }), // 用户id
		menuId: int()
			.notNull()
			.references(() => menuConfig.id, { onDelete: "cascade" }), // 菜单id
		enabled: int().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		index("idx_user_menu_permissions_user_id").on(t.userId),
		unique("uk_user_menu").on(t.userId, t.menuId),
	],
);

export const roleButtonPermissions = table(
	"role_button_permissions",
	{
		id: tableId(),
		role: text({ length: 50 }).notNull(), // 角色名称
		buttonKey: text({ length: 50 }).notNull(), // 按钮key
		enabled: int().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		unique("uk_role_button").on(t.role, t.buttonKey),
		index("idx_role_button_permissions_role").on(t.role),
	],
);

export const userButtonPermissions = table(
	"user_button_permissions",
	{
		id: tableId(),
		userId: text({ length: 255 })
			.notNull()
			.references(() => usersTable.userId, { onDelete: "cascade" }), // 用户id
		buttonKey: text({ length: 50 }).notNull(), // 按钮key
		enabled: int().default(1), // 0: 禁用 1: 启用
		...timestamps,
	},
	(t) => [
		unique("uk_user_button").on(t.userId, t.buttonKey),
		index("idx_user_button_permissions_user_id").on(t.userId),
	],
);

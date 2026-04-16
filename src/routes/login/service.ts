import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { menuConfig } from "@/db/schema/menu";
import {
	roleMenuPermissions,
	userMenuPermissions,
} from "@/db/schema/permissions";
import { usersTable } from "@/db/schema/users";
import { buildMenuTree } from "./utils";

export function getUser(username: string) {
	return db
		.select()
		.from(usersTable)
		.where(and(eq(usersTable.username, username), eq(usersTable.isDeleted, 0)))
		.limit(1);
}

export async function getMenuList(userId: string, role: string) {
	const menuItems = await db
		.select({
			id: menuConfig.id,
			parentId: menuConfig.parentId,
			name: menuConfig.name,
			url: menuConfig.url,
			icon: menuConfig.icon,
			enabled: sql`CASE WHEN ${userMenuPermissions.enabled} = 0
            THEN ${roleMenuPermissions.enabled}
            ELSE COALESCE(${userMenuPermissions.enabled}, ${roleMenuPermissions.enabled})
          END`.as("enabled"),
		})
		.from(menuConfig)
		.innerJoin(
			roleMenuPermissions,
			and(
				eq(roleMenuPermissions.menuId, menuConfig.id),
				eq(roleMenuPermissions.role, role),
			),
		)
		.leftJoin(
			userMenuPermissions,
			and(
				eq(userMenuPermissions.menuId, menuConfig.id),
				eq(userMenuPermissions.userId, userId),
			),
		)
		.where(eq(menuConfig.isDeleted, 0))
		.orderBy(menuConfig.parentId, menuConfig.sortOrder);

	return buildMenuTree(menuItems);
}

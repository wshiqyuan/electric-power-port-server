import { OpenAPIHono } from "@hono/zod-openapi";
import { compare } from "bcrypt-ts";
import { and, eq, sql } from "drizzle-orm";
import { sign } from "hono/jwt";
import { db } from "@/db";
import { menuConfig } from "@/db/schema/menu";
import {
	roleMenuPermissions,
	userMenuPermissions,
} from "@/db/schema/permissions";
import { usersTable } from "@/db/schema/users";
import type { HonoEnv } from "@/types";
import { logger } from "@/utils/logger";
import { postLogin } from "./routes";
import type { MenuItem, MenuListTree } from "./types";

const app = new OpenAPIHono<HonoEnv>();

export const loginRoute = app.openapi(postLogin, async (ctx) => {
	const { username, password } = ctx.req.valid("json");

	const user = await db
		.select()
		.from(usersTable)
		.where(and(eq(usersTable.username, username), eq(usersTable.isDeleted, 0)))
		.limit(1);
	const isValid = await compare(password, user[0]?.password);

	if (!isValid) {
		return ctx.json(
			{
				message: "用户名或者密码错误",
			},
			401,
		);
	}

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
				eq(roleMenuPermissions.role, user[0].role),
			),
		)
		.leftJoin(
			userMenuPermissions,
			and(
				eq(userMenuPermissions.menuId, menuConfig.id),
				eq(userMenuPermissions.userId, user[0].userId),
			),
		)
		.where(eq(menuConfig.isDeleted, 0))
		.orderBy(menuConfig.parentId, menuConfig.sortOrder);

	function buildMenuTree(items: MenuItem[]): MenuListTree[] {
		const map: Record<number, MenuListTree> = {};

		items.forEach((item) => {
			if (item.enabled) {
				map[item.id] = {
					name: item.name,
					url: item.url,
					icon: item.icon,
					children: [],
				};
			}
		});

		const tree: MenuListTree[] = [];
		items.forEach((item) => {
			if (!map[item.id]) {
				return;
			}

			if (item.parentId && map[item.parentId]) {
				map[item.parentId].children?.push({ ...map[item.id] });
			} else {
				tree.push(map[item.id]);
			}
		});

		return tree;
	}

	const rootNodes = buildMenuTree(menuItems);

	// JWT
	const payload = {
		sub: user[0].userId,
		role: user[0].role,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
	};
	const secret = process.env.JWT_SECRET as string;

	const token = await sign(payload, secret);

	return ctx.json(
		{
			token: token,
			user: {
				username,
				role: user[0].role,
			},
			menulist: rootNodes,
		},
		200,
	);
});

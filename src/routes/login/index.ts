import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
	loginRequestSchema,
	userInfoSchema,
} from "@/router-schema/login/idnex";
import type { HonoEnv } from "@/types";
import { logger } from "@/utils/logger";

const app = new OpenAPIHono<HonoEnv>();

export const loginRoute = app.openapi(
	createRoute({
		path: "/login",
		method: "post",
		request: {
			body: {
				content: {
					"application/json": {
						schema: loginRequestSchema,
					},
				},
			},
		},
		responses: {
			200: {
				description: "success",
				content: {
					"application/json": {
						schema: userInfoSchema,
					},
				},
			},
		},
	}),
	(ctx) => {
		const { username, password } = ctx.req.query();
		logger.info("login", `username: ${username}, password: ${password}`);
		return ctx.json({
			token: "adasdad1231",
			user: {
				username,
				roles: ["admin"],
			},
			menulist: [
				{
					name: "Dashboard",
					path: "/dashboard",
					icon: "dashboard",
					children: [
						{
							name: "Dashboard",
							path: "/dashboard",
							icon: "dashboard",
						},
					],
				},
			],
		});
	},
);

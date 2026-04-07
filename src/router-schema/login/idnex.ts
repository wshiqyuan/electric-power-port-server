import { z } from "@hono/zod-openapi";

export const paramSchema = z.object({
	username: z.string().min(1).openapi({
		description: "User name",
		example: "zhangsan",
	}),
	password: z.string().min(1).openapi({
		description: "User password",
		example: "123456",
	}),
});

export const userInfoSchema = z.object({
	token: z.string().min(1),
	user: z.object({
		username: z.string().min(1),
		roles: z.array(z.string()),
	}),
	menulist: z.array(z.object()),
});

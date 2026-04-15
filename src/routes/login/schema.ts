import { z } from "@hono/zod-openapi";

export const loginRequestSchema = z.object({
	username: z.string().min(1).openapi({
		description: "User name",
		example: "admin",
	}),
	password: z.string().min(1).openapi({
		description: "User password",
		example: "_admin123",
	}),
});

export const userInfoSchema = z.object({
	token: z.string().min(1),
	user: z.object({
		username: z.string().min(1),
		role: z.string().min(1),
	}),
	menulist: z.array(z.object()),
});

export const loginErrorResponse = z.object({
	message: z.string().openapi({
		description: "Error message",
		example: "Invalid username or password",
	}),
});

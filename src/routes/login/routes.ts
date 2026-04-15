import { createRoute } from "@hono/zod-openapi";
import {
	loginErrorResponse,
	loginRequestSchema,
	userInfoSchema,
} from "./schema";

export const postLogin = createRoute({
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
		401: {
			description: "error",
			content: {
				"application/json": {
					schema: loginErrorResponse,
				},
			},
		},
	},
});

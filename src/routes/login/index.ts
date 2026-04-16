import { OpenAPIHono } from "@hono/zod-openapi";
import { compare } from "bcrypt-ts";
import { sign } from "hono/jwt";
import type { HonoEnv } from "@/types";
import { logger } from "@/utils/logger";
import { postLogin } from "./routes";
import { getMenuList, getUser } from "./service";

const app = new OpenAPIHono<HonoEnv>();

export const loginRoute = app.openapi(postLogin, async (ctx) => {
	const { username, password } = ctx.req.valid("json");

	const user = await getUser(username);
	const isValid = await compare(password, user[0]?.password);

	if (!isValid) {
		return ctx.json(
			{
				message: "用户名或者密码错误",
			},
			401,
		);
	}

	const rootNodes = await getMenuList(user[0].userId, user[0].role);

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

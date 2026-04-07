import { emitter } from "@hono/event-emitter";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { timing } from "hono/timing";
import type { HonoEnv } from "@/types";
import { logger as cuntomLogger } from "@/utils/logger";
import { emitterHandlers } from "./emitter";

const route = new OpenAPIHono<HonoEnv>();
export function createBaseRoute() {
	route
		.use("*", timing({ total: true }))
		.use("*", requestId())
		.use(logger(cuntomLogger.system))
		.use(emitter(emitterHandlers))
		.use(prettyJSON());

	return route;
}

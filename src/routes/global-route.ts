import { emitter } from "@hono/event-emitter";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { timing } from "hono/timing";
import type { HonoEnv } from "@/types";
import { logger as cuntomLogger } from "@/utils/logger";
import { emitterHandlers } from "./emitter";

export function createBaseRoute() {
	const route = new Hono<HonoEnv>()
		.use("*", timing({ total: true }))
		.use("*", requestId())
		.use(logger(cuntomLogger.system))
		.use(emitter(emitterHandlers))
		.use(prettyJSON());

	return route;
}

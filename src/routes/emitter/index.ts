import {
	createEmitter,
	defineHandlers,
	type EventHandlers,
} from "@hono/event-emitter";
import type { HonoEnv } from "@/types";
import { logger } from "@/utils/logger";

export type Events = {
	"test:emitter": string;
};

export const emitterHandlers = defineHandlers<Events, HonoEnv>({
	"test:emitter": [
		(_ctx, payload) => {
			logger.info("Emitter", payload);
		},
	],
}) as EventHandlers<Events>;

export const emitter = createEmitter(emitterHandlers);

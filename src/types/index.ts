import type { Emitter } from "@hono/event-emitter";
import type { TimingVariables } from "hono/timing";
import type { ViteDevServer } from "vite";
import type { Events } from "@/routes/emitter";

export interface HonoEnv {
	Bindings: {
		viteL: ViteDevServer;
	};
	Variables: TimingVariables & {
		emitter: Emitter<Events>;
	};
}

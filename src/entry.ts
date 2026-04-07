import { showRoutes } from "hono/dev";
import { app } from "./routes";

showRoutes(app, {
	verbose: true,
});

export { app } from "./routes";

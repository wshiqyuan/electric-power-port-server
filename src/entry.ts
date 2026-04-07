import { showRoutes } from "hono/dev";
import { app } from "./routes";

showRoutes(app, {
	verbose: false,
});

export { app } from "./routes";

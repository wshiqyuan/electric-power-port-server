import { Scalar } from "@scalar/hono-api-reference";
import { createBaseRoute } from "./global-route";
import { loginRoute } from "./login";

export const app = createBaseRoute();

app.doc("/doc", {
	info: {
		title: "API Reference",
		version: "v1",
	},
	openapi: "3.1.0",
});

app.get(
	"/scalar",
	Scalar({
		url: "/doc",
		hideClientButton: true,
		defaultHttpClient: {
			targetKey: "js",
			clientKey: "fetch",
		},
	}),
);

export const routes = app.route("/", loginRoute);

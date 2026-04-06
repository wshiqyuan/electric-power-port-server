/// <reference types="vitest/config" />

import path from "node:path";
import devServer from "@hono/vite-dev-server";
import { nodeAdapter } from "@hono/vite-dev-server/node";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { PORT } from "./src/config";

export default defineConfig({
	server: {
		port: PORT,
	},
	resolve: {
		tsconfigPaths: true,
	},
	build: {
		emptyOutDir: true,
		ssr: true,
		rolldownOptions: {
			external: ["node_modules", "^node:"],
			input: {
				index: path.resolve(__dirname, "src", "index.ts"),
			},
		},
	},
	plugins: [
		devServer({
			entry: path.resolve(__dirname, "src", "entry.ts"),
			export: "app",
			adapter: nodeAdapter,
		}),
		tsConfigPaths(),
	],
	test: {},
});

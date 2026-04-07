import { createLogger } from "@cmtlyt/logger";
import { nodeConsoleAdapter } from "@cmtlyt/logger/adapters/node";

interface Data {
	type: string;
	module: string;
	message: string;
	oriOptions: Record<string, any>;
}

type Logger = Record<
	string,
	(module: string, message: string, ...otherMessage: string[]) => void
>;

export const logger: Logger = createLogger<Data>({
	transform(options) {
		const isSystem = options.type === "system";
		return {
			type: options.type,
			module: isSystem ? "" : options.messages[0],
			message: options.messages[isSystem ? 0 : 1],
			oriOptions: options,
		};
	},
	outputAdapters: [
		nodeConsoleAdapter<Data>({
			allowTypes: ["system"],
			getLabel(options) {
				return options.transformData.module;
			},
			getMessages(options) {
				return [options.transformData.message, ...options.messages.slice(2)];
			},
		}),
	],
});

import { z } from "zod";

export const refinedUrl = z
	.string()
	.url()
	.refine((value) => {
		try {
			const url = new URL(value);

			const forbiddenChars = /[<>{}"|\\^`\s\']/;

			const hasRealHost = url.hostname.includes(".");
			const hasNoForbiddenChars = !forbiddenChars.test(value);

			return hasRealHost && hasNoForbiddenChars;
		} catch {
			return false;
		}
	});

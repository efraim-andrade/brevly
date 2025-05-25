import type { LinkFields } from "@/components/NewLinkForm";

export type Link = LinkFields & {
	accessCount: number;
};

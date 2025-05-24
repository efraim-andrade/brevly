import type { LinkFields } from "@/components/NewLinkForm";

export type Link = LinkFields & {
	id: string;
	clicks: number;
};

import { api } from "@/lib/api";
import { BASE_URL } from "@/lib/query";
import type { Link } from "@/types";

export async function getLinks() {
	const response = await api.get<Link[]>({ url: `${BASE_URL}/links` });

	return response;
}

export type CreateLinkRequest = Pick<Link, "originalUrl" | "shortUrl">;

export async function createLink(link: CreateLinkRequest) {
	const response = await api.post<CreateLinkRequest>({
		url: `${BASE_URL}/link`,
		data: link,
	});

	return response;
}

export async function deleteLink(shortUrl: string) {
	const response = await api.delete({ url: `${BASE_URL}/link/${encodeURIComponent(shortUrl)}` });

	return response;
}

export async function updateLinkAccessNumber(shortUrl: string) {
	const response = await api.patch({ url: `${BASE_URL}/link/${encodeURIComponent(shortUrl)}` });

	return response;
}

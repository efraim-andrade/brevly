import { api } from "@/lib/api";
import { BASE_URL } from "@/lib/query";

export async function getCSV(): Promise<string | undefined> {
	const response = await api.get<{ url: string }>({
		url: `${BASE_URL}/links/export`,
	});

	return response.url;
}

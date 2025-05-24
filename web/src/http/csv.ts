import { api } from "@/lib/api";
import { BASE_URL } from "@/lib/query";

export async function getCSV() {
	const response = await api.get({ url: `${BASE_URL}/csv` });

	return response;
}

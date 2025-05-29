import { QueryClient } from "@tanstack/react-query";

export const BASE_URL =
	import.meta.env.VITE_BASE_URL || "http://localhost:3333";

export const queryClient = new QueryClient();

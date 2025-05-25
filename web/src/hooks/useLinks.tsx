import {
	type CreateLinkRequest,
	createLink,
	deleteLink,
	getLinks,
	updateLinkAccessNumber,
} from "@/http/links";
import { queryClient } from "@/lib/query";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLinksQuery() {
	const query = useQuery({
		queryKey: ["links"],
		queryFn: () => getLinks(),
		initialData: [],
	});

	return query;
}

export function useCreateLinkMutation() {
	const mutation = useMutation({
		mutationFn: (link: CreateLinkRequest) => createLink(link),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});

	return mutation;
}

export function useDeleteLinkMutation() {
	const mutation = useMutation({
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});

	return mutation;
}

export function useUpdateLinkAccessNumberMutation() {
	const mutation = useMutation({
		mutationFn: (shortUrl: string) => updateLinkAccessNumber(shortUrl),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] });
		},
	});

	return mutation;
}

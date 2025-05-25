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
			queryClient.refetchQueries({ queryKey: ["links"] });
		},
	});

	return mutation;
}

export function useDeleteLinkMutation() {
	const mutation = useMutation({
		mutationFn: (shortUrl: string) => deleteLink(shortUrl),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["links"] });
		},
		onSettled: () => {
			queryClient.refetchQueries({ queryKey: ["links"] });
		},	
	});

	return mutation;
}

export function useUpdateLinkAccessNumberMutation() {
	const mutation = useMutation({
		mutationFn: (shortUrl: string) => updateLinkAccessNumber(shortUrl),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["links"] });
		},
	});

	return mutation;
}

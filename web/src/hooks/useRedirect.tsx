import {
	useLinkQuery,
	useUpdateLinkAccessNumberMutation,
} from "@/hooks/useLinks";
import { useEffect, useState } from "react";

const REDIRECT_DELAY = import.meta.env.VITE_REDIRECT_DELAY;

export function useRedirect(shortUrl: string) {
	const [secondsRemaining, setSecondsRemaining] = useState(
		REDIRECT_DELAY / 1000,
	);

	const {
		data,
		isPending: isQueryLoading,
		error: queryError,
	} = useLinkQuery(shortUrl);

	const { mutateAsync, error: mutationError } =
		useUpdateLinkAccessNumberMutation();

	useEffect(() => {
		function handleIncrementAccessCount() {
			mutateAsync(shortUrl);
		}

		if (data) {
			handleIncrementAccessCount();
		}
	}, [data, mutateAsync, shortUrl]);

	useEffect(() => {
		if (!data) return;

		const timer = setTimeout(() => {
			window.location.href = data.originalUrl;
		}, REDIRECT_DELAY);

		const countdown = setInterval(() => {
			setSecondsRemaining((seconds) => {
				if (seconds <= 1) {
					clearInterval(countdown);
					return 0;
				}
				return seconds - 1;
			});
		}, 1000);

		return () => {
			clearTimeout(timer);
			clearInterval(countdown);
		};
	}, [data]);

	return {
		secondsRemaining,
		isQueryLoading,
		queryError,
		mutationError,
		data,
	};
}

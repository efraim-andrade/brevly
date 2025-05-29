import { CardPage } from "@/components/CardPage";
import { NotFound } from "@/components/NotFound";
import { Button } from "@/components/ui";
import {
	useLinkQuery,
	useUpdateLinkAccessNumberMutation,
} from "@/hooks/useLinks";
import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";

export const Route = createFileRoute("/$shortUrl")({
	component: ShortUrl,
});

function ShortUrl() {
	const { shortUrl } = useParams({ from: "/$shortUrl" });

	const { data } = useLinkQuery(shortUrl);

	const { mutateAsync, error } = useUpdateLinkAccessNumberMutation();

	const handleIncrementAccessCount = useCallback(async () => {
		await mutateAsync(shortUrl);
	}, [mutateAsync, shortUrl]);

	useEffect(() => {
		if (data) {
			handleIncrementAccessCount();
			setTimeout(() => {
				window.location.href = data.originalUrl;
			}, 1500);
		}
	}, [data, handleIncrementAccessCount]);

	if (!data) {
		return <NotFound />;
	}

	return (
		<CardPage
			image={
				error ? (
					<WarningIcon size={60} className="text-danger" />
				) : (
					<img
						src="assets/logo-icon.svg"
						alt="Logo"
						className="w-12 h-12 animate-bounce"
					/>
				)
			}
			title={error ? "Erro ao redirecionar" : "Redirecionando..."}
			description={
				error ? (
					<>
						Algo deu errado ao redirecionar
						<span className="block mt-1">Tente novamente mais tarde, </span>
						<Button
							className="mt-4 mx-auto"
							label="Voltar"
							variant="secondary"
							icon={<ArrowLeftIcon size={16} className="text-white" />}
							onClick={() => {
								window.location.href = "/";
							}}
						/>
					</>
				) : (
					<>
						O link será aberto automaticamente em alguns instantes.
						<span className="block mt-1">
							Não foi redirecionado?{" "}
							<a href={`/${shortUrl}`} className="text-blue-base underline">
								Acesse aqui
							</a>
						</span>
					</>
				)
			}
		/>
	);
}

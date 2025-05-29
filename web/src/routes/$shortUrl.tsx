import { CardPage } from "@/components/CardPage";
import { NotFound } from "@/components/NotFound";
import { useRedirect } from "@/hooks/useRedirect";
import { SpinnerIcon, WarningIcon } from "@phosphor-icons/react";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$shortUrl")({
	component: ShortUrl,
});

function ShortUrl() {
	const { shortUrl } = useParams({ from: "/$shortUrl" });

	const { data, isQueryLoading, mutationError, queryError, secondsRemaining } =
		useRedirect(shortUrl);

	if (isQueryLoading) {
		return (
			<CardPage
				image={<SpinnerIcon size={60} className="text-primary animate-spin" />}
				title="Carregando..."
				description="Buscando seu link..."
			/>
		);
	}

	if (!data) {
		return <NotFound />;
	}

	return (
		<CardPage
			image={
				queryError || mutationError ? (
					<WarningIcon size={60} className="text-danger" />
				) : (
					<img
						src="assets/logo-icon.svg"
						alt="Logo"
						className="w-12 h-12 animate-bounce"
					/>
				)
			}
			title={queryError ? "Erro ao redirecionar" : "Redirecionando..."}
			description={
				<>
					O link será aberto automaticamente em {secondsRemaining} segundos.
					<span className="block mt-1">
						Não foi redirecionado?{" "}
						<a href={data.originalUrl} className="text-blue-base underline">
							Acesse aqui
						</a>
					</span>
				</>
			}
		/>
	);
}

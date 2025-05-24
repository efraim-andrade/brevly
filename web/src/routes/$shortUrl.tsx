import { CardPage } from "@/components/CardPage";
import { NotFound } from "@/components/NotFound";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$shortUrl")({
	loader: async ({ params: { shortUrl } }) => {
		console.log("👻 shortUrl:", shortUrl);
		// Search for the short url if not found throw it

		// throw notFound();
	},
	component: ShortUrl,
	notFoundComponent: () => {
		return <NotFound />;
	},
});

function ShortUrl() {
	const { shortUrl } = useParams({ from: "/$shortUrl" });

	return (
		<CardPage
			image={
				<img
					src="assets/logo-icon.svg"
					alt="Logo"
					className="w-12 h-12 animate-bounce"
				/>
			}
			title="Redirecionando..."
			description={
				<>
					O link será aberto automaticamente em alguns instantes.
					<span className="block mt-1">
						Não foi redirecionado?{" "}
						<a href={`/${shortUrl}`} className="text-blue-base underline">
							Acesse aqui
						</a>
					</span>
				</>
			}
		/>
	);
}

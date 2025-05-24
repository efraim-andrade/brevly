import { CardPage } from "@/components/CardPage";

export function NotFound() {
	return (
		<CardPage
			image={
				<img
					src="assets/not-found.svg"
					alt="Logo"
					className="w-[195px] h-[85px]"
				/>
			}
			title="Link não encontrado"
			description={
				<>
					O link que você está tentando acessar não existe, foi removido ou é
					uma URL inválida. Saiba mais em{" "}
					<a href="https://brev.ly" className="text-blue-base underline">
						brev.ly
					</a>
					.
				</>
			}
		/>
	);
}

import { Header } from "@/components/Header";
import { LinkList } from "@/components/LinkList";
import { NewLinkForm } from "@/components/NewLinkForm";
import { Button, Card } from "@/components/ui";
import { getCSV } from "@/http/csv";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const handleDownloadCSV = async () => {
		const url = await getCSV();

		if (!url) return;

		window.open(url, "_blank");
	};

	return (
		<main className="max-w-[980px] mx-auto flex flex-col gap-6">
			<Header />

			<section className="grid lg:grid-cols-[380px_1fr] gap-4 w-full items-start">
				<Card title="Novo Link">
					<NewLinkForm />
				</Card>

				<Card
					title="Meus links"
					renderAction={
						<Button
							icon={<DownloadSimpleIcon />}
							label="Baixar CSV"
							variant="secondary"
							onClick={handleDownloadCSV}
						/>
					}
				>
					<LinkList />
				</Card>
			</section>
		</main>
	);
}

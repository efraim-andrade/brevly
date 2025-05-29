import { Card } from "@/components/ui";

type CardPageProps = {
	image: React.ReactNode;
	title: string;
	description: React.ReactNode;
};

export function CardPage({ image, title, description }: CardPageProps) {
	return (
		<div className="flex items-center justify-center min-h-[80vh] ">
			<Card className="w-full max-w-[580px] mx-auto py-12 lg:py-17 lg:px-12">
				<div className="flex flex-col items-center gap-6">
					{image}

					<h2 className="text-2xl font-bold text-gray-600">{title}</h2>

					<p className="text-md text-center text-gray-500 m-0">{description}</p>
				</div>
			</Card>
		</div>
	);
}

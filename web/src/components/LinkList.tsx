import { Feedback } from "@/components/Feedback";
import { LinkItem } from "@/components/LinkItem";
import { useLinksQuery } from "@/hooks/useLinks";
import { LinkIcon, SpinnerIcon } from "@phosphor-icons/react";

export function LinkList() {
	const { data: links, error, isFetching } = useLinksQuery();

	if (isFetching) {
		return (
			<div className="flex flex-col gap-4 items-center justify-center">
				<SpinnerIcon className="text-blue-base animate-spin" size={38} />
			</div>
		);
	}

	if (!links || links.length === 0) {
		return (
			<div className="py-4 flex flex-col gap-4 items-center justify-center">
				{error && <Feedback message="Something went wrong fetch the links, try again later" />}

					<LinkIcon className="text-gray-400" size={32} />

				<p className="uppercase text-gray-500 text-xs">
					Ainda não existem links cadastrados
				</p>
			</div>
		);
	}

	return (
		<ul className="flex flex-col gap-4 w-full">
			{links.map((link) => (
				<LinkItem key={link.shortUrl} {...link} />
			))}
		</ul>
	);
}

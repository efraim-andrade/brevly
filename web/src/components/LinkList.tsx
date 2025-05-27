import { Feedback } from "@/components/Feedback";
import { LinkItem } from "@/components/LinkItem";
import { useLinksQuery } from "@/hooks/useLinks";
import { LinkIcon, SpinnerIcon } from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

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
				{error && (
					<Feedback message="Something went wrong fetch the links, try again later" />
				)}

				<LinkIcon className="text-gray-400" size={32} />

				<p className="uppercase text-gray-500 text-xs">
					Ainda não existem links cadastrados
				</p>
			</div>
		);
	}

	return (
		<ScrollArea.Root type="scroll" className="overflow-hidden w-full">
			<ScrollArea.Viewport className="h-[35dvh] lg:h-[64dvh] w-full">
				<ul className="flex flex-col gap-4 w-full">
					{links.map((link) => (
						<LinkItem key={link.shortUrl} {...link} />
					))}
				</ul>
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar
				className="flex touch-none select-none bg-blue-base p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-blue-950 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	);
}

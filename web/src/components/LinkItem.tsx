import { IconButton } from "@/components/ui";
import { useDeleteLinkMutation } from "@/hooks/useLinks";
import type { Link } from "@/types";
import {
	CheckIcon,
	CopyIcon,
	SpinnerIcon,
	TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export function LinkItem({
	accessCount = 0,
	originalUrl,
	shortUrl,
	...rest
}: Link) {
	const { mutate: deleteLink, isPending: isDeleting } = useDeleteLinkMutation();

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};

	const handleDelete = () => {
		deleteLink(shortUrl);
	};

	return (
		<li
			className="grid grid-cols-6 gap-4 justify-between items-start not-first:border-t not-first:border-gray-200 not-first:pt-4"
			{...rest}
		>
			<div className="flex flex-col gap-1 col-span-3 lg:col-span-4">
				<a
					href={`https://${shortUrl}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-md text-blue-base truncate hover:brightness-130"
				>
					{shortUrl}
				</a>

				<a
					href={originalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-gray-500 truncate hover:text-gray-900"
				>
					{originalUrl}
				</a>
			</div>

			<div className="flex gap-4 col-span-3 lg:col-span-2 items-center justify-self-end">
				<span className="text-sm text-gray-500">{accessCount} acessos</span>

				<div className="flex gap-1">
					<IconButton
						icon={copied ? <CheckIcon /> : <CopyIcon />}
						onClick={handleCopy}
						className={copied ? "bg-green-300" : ""}
					/>

					<IconButton
						icon={isDeleting ? <SpinnerIcon /> : <TrashIcon />}
						onClick={handleDelete}
						className={isDeleting ? "bg-red-300" : ""}
					/>
				</div>
			</div>
		</li>
	);
}

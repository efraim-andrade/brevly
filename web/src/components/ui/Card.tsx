import { cn } from "@/utils/cn";
import type React from "react";

type CardProps = {
	title?: string;
	renderAction?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
};

export function Card({ title, children, renderAction, className }: CardProps) {
	return (
		<div
			className={cn(
				"w-full flex flex-col items-center justify-center rounded-lg bg-white p-6 gap-6",
				className,
			)}
			aria-labelledby="group"
		>
			{title && (
				<header className="flex justify-between w-full items-center">
					<h2 className="text-gray-600 text-lg">{title}</h2>

					{renderAction}
				</header>
			)}

			{!!renderAction && <hr className="border-1 w-full border-gray-200" />}

			{children}
		</div>
	);
}

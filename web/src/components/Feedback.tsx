import { WarningIcon } from "@phosphor-icons/react";

type FeedbackProps = {
	message?: string;
};

export function Feedback({
	message = "Something went wrong, try again later",
}: FeedbackProps) {
	return (
		<div className="flex items-center gap-2 bg-danger-light p-2 rounded-lg bg-red-100 text-danger text-md">
			<WarningIcon className="text-danger" size={16} />

			<p>{message}</p>
		</div>
	);
}

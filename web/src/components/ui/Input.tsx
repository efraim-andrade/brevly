import type { LinkFields } from "@/components/NewLinkForm";
import { cn } from "@/utils/cn";
import { Warning } from "@phosphor-icons/react";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegister } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string;
	register: UseFormRegister<LinkFields>;
	name: keyof LinkFields;
	prefix?: string;
};

const baseStyles = {
	input:
		"peer h-12 rounded-lg border-1 px-4 border-gray-300 text-md text-gray-600 caret-blue-base outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-base active:border-blue-base",
	label:
		"text-gray-500 text-xs uppercase  transition-colors duration-200 peer-focus:text-blue-base peer-focus:font-bold peer-active:text-blue-base peer-active:font-bold",
};

const variantsStyles = {
	error: {
		label:
			"font-bold text-danger peer-focus:text-danger peer-active:text-danger",
		input: "border-danger text-danger focus:border-danger active:border-danger",
	},
};

export function Input({
	label,
	name,
	error,
	register,
	prefix,
	...rest
}: InputProps) {
	const hasError = !!error;

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex flex-col-reverse gap-2 relative">
				{prefix && (
					<span className="text-gray-400 text-md absolute top-[54%] left-4 select-none">
						{prefix}
					</span>
				)}

				<input
					id={name}
					className={cn(
						baseStyles.input,
						hasError && variantsStyles.error.input,
						prefix && "pl-16",
					)}
					{...register(name)}
					{...rest}
				/>

				<label
					htmlFor={name}
					className={cn(
						baseStyles.label,
						hasError && variantsStyles.error.label,
					)}
				>
					{label}
				</label>
			</div>

			{error && (
				<p className="flex gap-2 items-center">
					<Warning className="text-danger" size={14} />{" "}
					<span className="text-gray-500 text-sm">{error}</span>
				</p>
			)}
		</div>
	);
}

import { Button, Input } from "@/components/ui";
import { useCreateLinkMutation } from "@/hooks/useLinks";
import { zodResolver } from "@hookform/resolvers/zod";
import { WarningIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	original: z.string().url("Deve ser uma URL válida"),
	shortened: z.string().min(1, "Campo obrigatório"),
});

export type LinkFields = z.infer<typeof schema>;

export function NewLinkForm() {
	const {
		mutate: createLink,
		isPending,
		error: createLinkError,
	} = useCreateLinkMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LinkFields>({
		resolver: zodResolver(schema),
		defaultValues: {
			original: "",
			shortened: "",
		},
	});

	const onSubmit = (data: LinkFields) => {
		createLink(data, {
			onSuccess: () => {
				reset();
			},
		});
	};

	return (
		<form
			className="w-full flex flex-col gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label="Link Original"
				placeholder="www.exemplo.com.br"
				register={register}
				name="original"
				error={errors.original?.message}
			/>

			<Input
				label="Link Encurtado"
				placeholder="brev.ly/"
				register={register}
				name="shortened"
				error={errors.shortened?.message}
			/>

			<Button label="Salvar link" type="submit" isLoading={isPending} />

			{createLinkError && (
				<div className="flex items-center gap-2 bg-danger-light p-2 rounded-lg bg-red-50">
					<WarningIcon className="text-danger" size={16} />

					<span className="text-sm text-danger">
						{createLinkError.message ||
							"Something went wrong on create link, try again later"}
					</span>
				</div>
			)}
		</form>
	);
}

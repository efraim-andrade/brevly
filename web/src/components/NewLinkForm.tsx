import { Feedback } from "@/components/Feedback";
import { Button, Input } from "@/components/ui";
import { useCreateLinkMutation } from "@/hooks/useLinks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	originalUrl: z.string().url("Deve ser uma URL válida"),
	shortUrl: z.string().min(1, "Campo obrigatório"),
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
			originalUrl: "",
			shortUrl: "",
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
				name="originalUrl"
				error={errors.originalUrl?.message}
			/>

			<Input
				label="Link Encurtado"
				placeholder="brev.ly/"
				register={register}
				name="shortUrl"
				error={errors.shortUrl?.message}
			/>

			<Button label="Salvar link" type="submit" isLoading={isPending} />

			{createLinkError && (
				<Feedback message={createLinkError.message || "Something went wrong on create link, try again later"} />
			)}
		</form>
	);
}

type APICallProps<T = unknown> = {
	url: string;
	data?: T;
};

export const api = {
	get: async <T>({ url }: APICallProps<T>) => {
		try {
			const response = await fetch(url);

			return await (response.json() as Promise<T>);
		} catch (error) {
			console.error(error);
		}
	},

	post: async <T>({ url, data }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
			});

			return await (response.json() as Promise<T>);
		} catch (error) {
			console.error(error);
		}
	},

	delete: async <T>({ url }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "DELETE",
			});

			return await (response.json() as Promise<T>);
		} catch (error) {
			console.error(error);
		}
	},

	update: async <T>({ url, data }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "PUT",
				body: JSON.stringify(data),
			});

			return await (response.json() as Promise<T>);
		} catch (error) {
			console.error(error);
		}
	},

	patch: async <T>({ url, data }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "PATCH",
				body: JSON.stringify(data),
			});

			return await (response.json() as Promise<T>);
		} catch (error) {
			console.error(error);
		}
	},
};

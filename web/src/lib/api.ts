type APICallProps<T = unknown> = {
	url: string;
	data?: T;
};

export const api = {
	get: async <T>({ url }: APICallProps<T>) => {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			return await (response.json() as Promise<T>);
		} catch (error) {
			throw error;
		}
	},

	post: async <T>({ url, data }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			return await (response.json() as Promise<T>);
		} catch (error) {
			throw error;
		}
	},

	delete: async <T>({ url }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			return await (response.json() as Promise<T>);
		} catch (error) {
			throw error;
		}
	},

	update: async <T>({ url, data }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "PUT",
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			return await (response.json() as Promise<T>);
		} catch (error) {
			throw error;
		}
	},

	patch: async <T>({ url, data }: APICallProps<T>) => {
		try {
			const response = await fetch(url, {
				method: "PATCH",
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			return await (response.json() as Promise<T>);
		} catch (error) {
			throw error;
		}
	},
};

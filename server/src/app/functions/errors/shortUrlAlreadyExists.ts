export class ShortURLAlreadyExistsError extends Error {
	constructor() {
		super("Short URL already exists");
	}
}

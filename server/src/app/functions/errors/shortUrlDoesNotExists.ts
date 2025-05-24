export class ShortUrlDoesNotExistsError extends Error {
  constructor() {
    super('Short URL does not exists.')
  }
}

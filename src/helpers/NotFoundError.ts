class NotFoundError extends Error {
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = 'NotFoundError';
    this.code = 404 || code;
  }
}

export default NotFoundError;

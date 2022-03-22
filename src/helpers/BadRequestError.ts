class BadRequestError extends Error {
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = 'BadRequestError';
    this.code = 400 || code;
  }
}

export default BadRequestError;

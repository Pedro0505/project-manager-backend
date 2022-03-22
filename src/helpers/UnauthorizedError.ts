class UnauthorizedError extends Error {
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 401 || code;
  }
}

export default UnauthorizedError;

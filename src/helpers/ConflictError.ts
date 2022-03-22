class ConflictError extends Error {
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = 'ConflictError';
    this.code = 409 || code;
  }
}

export default ConflictError;

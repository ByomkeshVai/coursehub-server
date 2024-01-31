class DuplicatePassword extends Error {
  public statusCode: number;
  public data?: string | null;

  constructor(
    statusCode: number,
    message: string,
    data?: string | null,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data || null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default DuplicatePassword;

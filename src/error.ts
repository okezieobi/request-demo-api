export class AppError extends Error {
  constructor(
    message: string,
    readonly status = 500,
    readonly cause?: unknown,
  ) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

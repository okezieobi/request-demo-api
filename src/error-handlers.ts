import { Request, Response, NextFunction } from "express";
import { AppError } from "./error";

// Log errors
function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  console.error(err);
  next(err);
}

// Client error handler
function clientErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.xhr || err instanceof AppError) {
    res
      .status(err.status ?? 500)
      .send({ status: true, message: err.message ?? "error", data: err });
  } else {
    next(err);
  }
}

// General error handler
function errorHandler(err: Error, req: Request, res: Response): void {
  res.status(500);
  res.render("error", { error: err });
}

export { logErrors, clientErrorHandler, errorHandler };

import { Request, Response, NextFunction } from "express";
import { AppError } from "./error";
import { ZodError } from "zod";

export class ErrorHandlers {
  static logErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    console.error(err);
    next(err);
  }

  static handleZodErrors(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof ZodError) {
      res.status(400).send({
        status: false,
        message: "Bad Request",
        data: err,
      });
    } else {
      next(err);
    }
  }

  static clientErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err instanceof AppError) {
      res
        .status(err.status ?? 500)
        .send({ status: false, message: err.message ?? "error", data: err });
    } else {
      next(err);
    }
  }

  static errorHandler(err: Error, req: Request, res: Response): void {
    res.status(500);
    res.render("error", { error: err });
  }
}

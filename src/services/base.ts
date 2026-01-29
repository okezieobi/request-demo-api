import { AppError } from "../error";

export abstract class BaseServices {
  protected isNotNull<T>(error: string, status: number, data?: T | null) {
    if (data == null) {
      throw new AppError(error, status);
    }
    return data;
  }
}

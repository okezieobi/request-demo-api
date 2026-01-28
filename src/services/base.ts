import { AppError } from "../error";

export abstract class BaseServices {
  isNotNull<T>(error: string, status: number, data?: T | null) {
    if (data == null) {
      throw new AppError(error, status);
    }
    return data;
  }
}

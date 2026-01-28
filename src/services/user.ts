import { User } from "../domain/user";
import { InsertUserDTO } from "../interfaces/dto/insert-user.req";
import { BaseServices } from "./base";

export abstract class UserServices extends BaseServices {
  abstract insert(input: InsertUserDTO): Promise<User>;
}

import { User } from "../domain/user";
import { InsertUserDTO } from "../interfaces/dto/insert-user.req";
import { PaginateListDTO } from "../interfaces/dto/paginate-list.req";
import { BaseServices } from "./base";

export abstract class UserServices extends BaseServices {
  abstract insert(input: InsertUserDTO): Promise<User>;
  abstract list(input: PaginateListDTO): Promise<User[]>;
  abstract read(id: string): Promise<User>;
  abstract remove(id: string): Promise<User | undefined>;
}

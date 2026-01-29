import { User } from "../domain/user";
import { InsertUserDTO } from "../interfaces/dto/insert-user.req";
import { PaginateListDTO } from "../interfaces/dto/paginate-list.req";
import { UpdateUserDTO } from "../interfaces/dto/update-user";

export abstract class UserServices {
  abstract insert(input: InsertUserDTO): Promise<User>;
  abstract list(input: PaginateListDTO): Promise<User[]>;
  abstract read(id: string): Promise<User>;
  abstract remove(id: string): Promise<User | undefined>;
  abstract update(input: UpdateUserDTO, id: string): Promise<User | undefined>;
}

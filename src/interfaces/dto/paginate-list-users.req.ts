import z from "zod";
import { PaginateListDTO } from "./paginate-list.req";

export const PaginateListUsersDTO = PaginateListDTO.extend({
  name: z.string().optional(),
});
export type PaginateListUsersDTO = z.infer<typeof PaginateListUsersDTO>;

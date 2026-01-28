import z from "zod";
import { InsertUserDTO } from "./insert-user.req";

export const UpdateUserDTO = InsertUserDTO.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;

import { ObjectId } from "mongodb";
import z from "zod";

export const UserIdDTO = z.object({
  user_id: z
    .string()
    .refine(
      (arg) => ObjectId.isValid(arg),
      "User id must be valid object id string",
    ),
});

export type UserIdDTO = z.infer<typeof UserIdDTO>;

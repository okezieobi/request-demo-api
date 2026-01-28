import z from "zod";

export const UserIdDTO = z.object({
  user_id: z.uuid(),
});

export type UserIdDTO = z.infer<typeof UserIdDTO>;

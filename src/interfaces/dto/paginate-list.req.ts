import z from "zod";

export const PaginateListDTO = z.object({
  page: z.int().min(1).default(1),
});
export type PaginateListDTO = z.infer<typeof PaginateListDTO>;

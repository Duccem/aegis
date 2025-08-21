import z from "zod";

export const paginateSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(["ASC", "DESC"]).default("ASC"),
});

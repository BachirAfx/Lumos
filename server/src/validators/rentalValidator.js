import { z } from 'zod';

export const createRequestSchema = z.object({
  listingId: z.number().int().positive("Invalid listing ID"),
  startDate: z.string().datetime("Must be a valid ISO datetime"),
  endDate: z.string().datetime("Must be a valid ISO datetime"),
  message: z.string().optional()
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"]
});

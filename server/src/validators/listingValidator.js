import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  pricePerDay: z.number().nonnegative().optional(),
  pricePerHour: z.number().nonnegative().optional()
}).refine(data => data.pricePerDay !== undefined || data.pricePerHour !== undefined, {
  message: "Provide either a price per day or a price per hour, or both.",
  path: ["pricePerDay", "pricePerHour"]
});

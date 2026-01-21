import z from "zod";

export const tableSchema = z.object({
  name: z.string(),
  description: z.string(),
  capacity: z.number(),
  status: z.string(),
});

export const tableFormSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  description: z.string().min(1, "Description is Required"),
  capacity: z.string().min(1, "Capacity is Required"),
  status: z.string().min(1, "Status is Required"),
});

export type TableForm = z.infer<typeof tableFormSchema>;
export type Table = z.infer<typeof tableSchema> & { id: string };

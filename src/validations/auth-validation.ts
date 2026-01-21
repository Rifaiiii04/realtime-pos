import z from "zod";

export const loginSchemaForm = z.object({
  email: z
    .string()
    .min(1, "Email is Required")
    .email("Please enter a valid Email"),
  password: z.string().min(1, "Password is Required"),
});

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email is Required")
    .email("Please enter a valid Email"),
  password: z.string().min(1, "Password is Required"),
  name: z.string().min(1, "Name is Required"),
  role: z.string().min(1, "Role is Required"),
  avatar_url: z.union([
    z.string().min(1, "Image is Required"),
    z.instanceof(File),
  ]),
});
export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  role: z.string().min(1, "Role is Required"),
  avatar_url: z.union([
    z.string().min(1, "Image is Required"),
    z.instanceof(File),
  ]),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;
export type CreateUserForm = z.infer<typeof createUserSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;

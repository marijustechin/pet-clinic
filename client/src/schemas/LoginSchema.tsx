import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Pamiršote įvesti el.pašto adresą" })
    .email({ message: "Neteisingas el. pašto adreso formatas" }),
  password: z.string().trim().min(1, { message: "Pamiršote įvesti slaptaždį" }),
});

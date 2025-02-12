import * as z from "zod";

export const AppointmentSchema = z.object({
  pet_name: z
    .string()
    .trim()
    .min(1, { message: "Pamiršote įvesti gyvūno vardą" }),
  date: z.string().date().min(5, { message: "Pamiršote pasirinkti datą" }),
  time: z.string().trim().min(5, { message: "Pamiršote pasirinkti laiką" }),
  //   pet_name: z
  //     .string()
  //     .trim()
  //     .min(1, { message: "Pamiršote įvesti gyvūno vardą" }),
  //   user_id: z.string(),
  //   date: z.string().date(),
  //   time: z.string(),
  notes: z.string().trim(),
});

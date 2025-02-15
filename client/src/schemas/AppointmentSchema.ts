import { addMonths } from 'date-fns';
import * as z from 'zod';

export const AppointmentSchema = z.object({
  pet_name: z
    .string()
    .trim()
    .min(1, { message: 'Pamiršote įvesti gyvūno vardą' }),
  date: z
    .date()
    .min(new Date(), { message: 'Negalite parinkti vizito datos iš praeities' })
    .max(addMonths(new Date(), 3), {
      message: 'Negalite parinkti vėlesnės datos, nei 3 mėn. nuo šiandien',
    })
    .nullable(),
  //   pet_name: z
  //     .string()
  //     .trim()
  //     .min(1, { message: "Pamiršote įvesti gyvūno vardą" }),
  //   user_id: z.string(),
  //   date: z.string().date(),
  //   time: z.string(),
  notes: z.string().trim(),
});

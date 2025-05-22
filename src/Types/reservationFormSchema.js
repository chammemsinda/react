import { z } from 'zod';


export const reservationSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Le téléphone est requis"),
  dateReservation: z.string().min(1, "La date est requise"),
  nombrePersonnes: z.number().min(1, "Au moins une personne est requise"),
  image: z.instanceof(FileList)
    .refine(files => files.length > 0, "Une image est requise")
});
export default reservationSchema;

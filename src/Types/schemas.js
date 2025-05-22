import { z } from 'zod';

// Schéma pour une propriété
export const PropertySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Le nom est requis"),
  adresse: z.string().min(1, "L'adresse est requise"),
  prix: z.number().positive("Le prix doit être positif"),
  nbvue: z.number().nonnegative("Le nombre de vues ne peut pas être négatif"),
  available: z.boolean()
});

// Type TypeScript pour une propriété (optionnel, pour l'autocomplétion)
export const PropertyType = PropertySchema.shape;

// Schéma pour une réservation
export const ReservationSchema = z.object({
  id: z.number().optional(),
  nom: z.string().min(1, "Le nom est requis"),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
  dateDebut: z.string().refine(val => !isNaN(new Date(val).getTime()), {
    message: "Date de début invalide"
  }),
  dateFin: z.string().refine(val => !isNaN(new Date(val).getTime()), {
    message: "Date de fin invalide"
  }),
  propertyId: z.number(),
  dateReservation: z.string().optional(),
  dureeJours: z.number().optional(),
  prixTotal: z.number().optional()
});

// Schéma pour le formulaire de réservation avec upload d'image
export const reservationSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Le téléphone est requis"),
  dateReservation: z.string().min(1, "La date est requise"),
  nombrePersonnes: z.number().min(1, "Au moins une personne est requise"),
  image: z.instanceof(FileList)
    .refine(files => files.length > 0, "Une image est requise")
});

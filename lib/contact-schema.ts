import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Por favor ingrese su nombre").max(100, "Nombre demasiado extenso"),
  email: z.string().trim().email("Dirección de email inválida").max(254, "Email demasiado extenso"),
  subject: z.string().trim().min(3, "Ingrese un asunto descriptivo").max(150, "Asunto demasiado extenso"),
  message: z
    .string()
    .trim()
    .min(10, "Por favor brinde más detalles (mínimo 10 caracteres)")
    .max(5000, "Mensaje demasiado extenso (máximo 5000 caracteres)"),
  // Honeypot anti-spam
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

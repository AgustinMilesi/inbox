import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("That email doesn't look right")
  .max(254, "That's too long");

const password = z
  .string()
  .min(10, "Use at least 10 characters")
  .max(128, "That's too long");

const optionalText = (max: number) => z.string().trim().max(max, "That's too long").optional();

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "That's too long"),
  organization: z.string().trim().min(2, "Name your company or team").max(80, "That's too long"),
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password").max(128, "That's too long"),
});

export const forgotSchema = z.object({ email });

export const resetSchema = z.object({
  token: z.string().min(20).max(100),
  password,
});

// What a visitor sends through a public form
export const publicMessageSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "That's too long"),
  email,
  subject: z.string().trim().min(3, "Add a short subject").max(150, "That's too long"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a bit more, 10 characters minimum")
    .max(5000, "That's too long, 5000 characters max"),
  // Honeypot: people never see it, bots tend to fill it in
  website: z.string().optional(),
});
export type PublicMessageInput = z.infer<typeof publicMessageSchema>;

export const contactSchema = z.object({
  id: z.string().max(40).optional(),
  name: z.string().trim().min(2, "Please enter a name").max(120, "That's too long"),
  email,
  phone: optionalText(40),
  company: optionalText(120),
  notes: optionalText(2000),
  externalId: optionalText(100),
});

export const formSchema = z.object({
  id: z.string().max(40).optional(),
  name: z.string().trim().min(2, "Give the form a name").max(80, "That's too long"),
  allowedOrigins: z.string().max(2000).optional(),
});

export const settingsSchema = z.object({
  name: z.string().trim().min(2, "Please enter a name").max(80, "That's too long"),
  notifyEmail: z.union([email, z.literal("")]).optional(),
  webhookUrl: z.string().trim().max(500, "That's too long").optional(),
});

export const messageStatusSchema = z.object({
  id: z.string().min(1).max(40),
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export const idSchema = z.object({ id: z.string().min(1).max(40) });

// Bodies accepted by the REST API (snake_case on the outside)
export const apiContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email,
  phone: z.string().trim().max(40).nullish(),
  company: z.string().trim().max(120).nullish(),
  notes: z.string().trim().max(2000).nullish(),
  external_id: z.string().trim().min(1).max(100).nullish(),
});
export const apiContactPatchSchema = apiContactSchema.partial();

export const firstIssue = (error: z.ZodError) => error.issues[0]?.message ?? "Some data is not valid";

export const blankToNull = (value: string | undefined | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

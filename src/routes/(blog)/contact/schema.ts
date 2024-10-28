import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	title: z.string().min(10),
	description: z.string().min(25)
});

export type ContactFormSchema = typeof contactFormSchema;

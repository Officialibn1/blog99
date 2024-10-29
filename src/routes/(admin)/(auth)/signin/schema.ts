import { z } from 'zod';

export const signInFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(50)
});

export type SignInFormSchema = typeof signInFormSchema;

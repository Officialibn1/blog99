import { z } from 'zod';

export const registerFormSchama = z.object({
	name: z.string().min(5),
	email: z.string().email(),
	password: z.string().min(8).max(50)
});

export type RegisterFormSchama = typeof registerFormSchama;

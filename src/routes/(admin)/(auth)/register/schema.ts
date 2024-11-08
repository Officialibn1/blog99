import { z } from 'zod';

export const registerFormSchama = z
	.object({
		name: z.string().min(5),
		email: z.string().email(),
		password: z.string().min(8).max(50),
		comfirmPassword: z.string().min(8).max(50)
	})
	.refine((data) => data.password === data.comfirmPassword, `Password's doesn't match.`);

export type RegisterFormSchama = typeof registerFormSchama;

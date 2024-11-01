import { z } from 'zod';

export const profileSettingsFormSchema = z.object({
	name: z.string().min(5),
	email: z.string().email(),
	username: z.string().min(5)
});

export type ProfileSettingsFormSchema = typeof profileSettingsFormSchema;

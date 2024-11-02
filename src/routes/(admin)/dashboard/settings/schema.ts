import { z } from 'zod';

export const passwordSettingsSchema = z.object({
	newPassword: z.string().min(8).max(50),
	comfirmNewPassword: z.string().min(8).max(50)
});

export type PasswordSettingsSchema = typeof passwordSettingsSchema;

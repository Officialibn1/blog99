import { z } from 'zod';

export const createBlogFormSchema = z.object({
	title: z.string().min(15),
	content: z.string().min(120),
	published: z.boolean().default(false)
});

export type CreateBlogFormSchema = typeof createBlogFormSchema;

import { z } from 'zod';

export const createBlogFormSchema = z.object({
	title: z.string().min(15),
	description: z.string().min(15),
	tags: z.array(z.string()).min(1, 'Please select at least one tag.'),
	category: z.string().min(3),
	content: z.string().min(120),
	published: z.boolean().default(false)
});

export type CreateBlogFormSchema = typeof createBlogFormSchema;

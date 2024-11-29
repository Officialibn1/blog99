import { z } from 'zod';

export const createBlogFormSchema = z.object({
	title: z.string().min(15),
	description: z.string().min(15),
	tags: z.array(z.string()).min(1, 'Please select at least one tag.'),
	category: z.string().min(3),
	thumbNail: z
		.instanceof(File)
		.refine((file) => file.size > 0, 'Image is required')
		.refine((file) => file.type.startsWith('image/'), 'Invalid image')
		.refine((file) => file.size <= 5 * 1024 * 1024, 'Max Image size is 5MB'),
	content: z.string().min(120),
	published: z.boolean().default(false)
});

export type CreateBlogFormSchema = typeof createBlogFormSchema;

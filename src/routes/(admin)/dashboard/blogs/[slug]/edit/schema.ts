import { z } from 'zod';

export const editBlogFormSchema = z.object({
	title: z.string().min(15, 'Title must be at least 15 characters'),
	description: z.string().min(15, 'Description must be at least 15 characters'),
	tags: z.array(z.string()).min(1, 'Please select at least one tag.'),
	category: z.string().min(3, 'Please select at least one category.'),
	thumbNail: z
		.instanceof(File)
		.refine((file) => file.size > 0, 'Image is required')
		.refine((file) => file.type.startsWith('image/'), 'Invalid image')
		.refine((file) => file.size <= 5 * 1024 * 1024, 'Max Image size is 5MB')
		.optional(),
	content: z.string(),
	published: z.boolean().default(false)
});

export type EditBlogFormSchema = typeof editBlogFormSchema;

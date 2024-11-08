import { z } from 'zod';

export const blogTagsSchema = z.object({
	name: z.string().min(3)
});

export type BlogTagsSchema = typeof blogTagsSchema;

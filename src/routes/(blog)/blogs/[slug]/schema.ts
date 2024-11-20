import { z } from 'zod';

export const commentFormSchema = z.object({
	comment: z.string().min(5, { message: 'Write a comment of at least five letters.' }),
	subscribersId: z
		.string()
		.min(1, { message: 'You need to subscribe or Login to add a comment!.' }),
	blogId: z.string().min(10)
});

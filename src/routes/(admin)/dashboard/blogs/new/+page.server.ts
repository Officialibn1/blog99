import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createBlogFormSchema } from './schema';

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(createBlogFormSchema));

		if (!form.valid) {
			return {
				message: 'Failed to create blog',
				success: false
			};
		}
		const { data } = form;

		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('content', data.content);
		formData.append('published', data.published.toString());
		formData.append('tags', JSON.stringify(data.tags));
		formData.append('category', data.category);

		if (data.thumbNail) {
			formData.append('thumbNail', data.thumbNail);
		}

		try {
			const res = await fetch('/api/blogs', {
				method: 'POST',
				body: formData
			});

			if (!res.ok) {
				if (res.status === 400) {
					return fail(400, {
						message: 'Blog already exists.',
						success: false
					});
				}

				return fail(400, {
					message: 'Failed to create blog.',
					success: false
				});
			}

			return {
				message: 'Created blog successfully',
				success: true
			};
		} catch (error) {
			console.log('Error Creating Blog: ', error);

			return fail(400, {
				message: 'Failed to create Blog',
				success: false
			});
		}
	}
} satisfies Actions;

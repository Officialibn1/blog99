import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createBlogFormSchema } from './schema';

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(createBlogFormSchema));

		if (!form.valid) {
			console.log('Failed to create blog');

			return {
				message: 'Failed to create blog',
				success: false,
				form
			};
		}

		const { data } = form;

		const res = await fetch('/api/blogs', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		if (!res.ok) {
			const message = await res.json();

			console.log('Res Not OK Message: ', message);

			return fail(400, {
				message: 'Failed to create Blog',
				success: false,
				form
			});
		}

		return {
			message: 'Created blog successfully',
			success: true,
			form
		};
	}
} satisfies Actions;

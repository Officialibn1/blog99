import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createBlogFormSchema } from './schema';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createBlogFormSchema));

		console.log(JSON.stringify(form, null, 2));

		if (!form.valid) {
			console.log('Failed to create blog');

			return {
				message: 'Failed to create blog',
				form
			};
		}

		console.log('Created blog successfully');

		return {
			message: 'Created blog successfully',
			form
		};
	}
} satisfies Actions;

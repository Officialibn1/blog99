import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogTagsSchema } from './schema';

export const actions = {
	addTag: async (event) => {
		const form = await superValidate(event, zod(blogTagsSchema));

		// await new Promise((resolve) => setTimeout(() => resolve, 1000));

		const tag = 'Javascript';

		// console.log(JSON.stringify(form, null, 2));

		if (!form.valid) {
			console.log('Failed to create Tag');

			return {
				message: 'Failed to create Tag',
				form
			};
		}

		if (form.data.name.toLowerCase === tag.toLowerCase) {
			setError(form, 'name', 'Tag already exists.');

			return {
				message: 'Tag already exists.',
				form
			};
		}

		// console.log('Created Tag Successfully');

		return {
			message: 'Created Tag Successfully',
			form
		};
	}
} satisfies Actions;

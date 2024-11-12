import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { categorySchema } from './schema';
import db from '$lib/database';

export const actions = {
	addCategory: async (event) => {
		const form = await superValidate(event, zod(categorySchema));

		if (!form.valid) {
			// console.log('Failed to create Category!!');

			setError(form, 'name', 'Invalid inpurt value!');

			return {
				message: 'Invalid inpurt value!',
				success: false,
				form
			};
		}

		const { name } = form.data;

		try {
			const category = await db.category.findUnique({ where: { name } });

			if (form.data.name.toLowerCase() === category?.name.toLowerCase()) {
				setError(form, 'name', 'Category already exists.');

				// console.log('Category already exists');

				return {
					message: 'Category already exists.',
					success: false,
					form
				};
			}

			const authToken = event.cookies.get('adminSession');

			const author = await db.user.findUnique({ where: { authToken } });

			await db.category.create({
				data: {
					name,
					authorId: author?.id as string
				}
			});

			return {
				message: 'Create tag successfully.',
				success: true,
				form
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			console.log('CAUGTH CATEGORY ERROR: ', JSON.stringify(error, null, 2));

			setError(form, 'name', 'Create Category Failed!');

			return {
				message: 'Create Category Failed!',
				success: false,
				form
			};
		}
	}
} satisfies Actions;

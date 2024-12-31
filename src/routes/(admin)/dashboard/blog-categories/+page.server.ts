import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { categorySchema } from './schema';
import db from '$lib/database';
import { error } from '@sveltejs/kit';

export const actions = {
	addCategory: async (event) => {
		const form = await superValidate(event, zod(categorySchema));

		if (!form.valid) {
			setError(form, 'name', 'Invalid input value!');

			return {
				message: 'Invalid input value!',
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

			if (!authToken) {
				error(401, 'unAuthorized Access');
			}

			const author = await db.user.findUnique({ where: { authToken } });

			if (!author) {
				event.cookies.delete('adminSession', { path: '/' });

				error(401, 'Session Expired!');
			}

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
		} catch (e) {
			console.log('CAUGTH CATEGORY ERROR: ', e instanceof Error ? e.message : JSON.stringify(e));

			setError(form, 'name', 'Create Category Failed!');

			return {
				message: 'Create Category Failed!',
				success: false,
				form
			};
		}
	},
	deleteCategory: async ({ request, cookies, fetch }) => {
		const authToken = cookies.get('adminSession');

		const data = await request.formData();

		const id = data.get('categoryId');

		// console.log(data);

		if (!authToken) {
			error(401, 'unAuthorized Access');
		}

		const res = await fetch(`/api/categories`, {
			method: 'DELETE',
			body: JSON.stringify({ id })
		});

		if (!res.ok) {
			const message = await res.text();

			return {
				message,
				success: false
			};
		}

		return {
			message: 'Category deleted successfully.',
			success: true
		};
	}
} satisfies Actions;

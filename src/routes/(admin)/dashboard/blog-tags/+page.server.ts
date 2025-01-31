import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogTagsSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const actions = {
	addTag: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(blogTagsSchema));

		if (!form.valid) {
			console.log('Failed to create Tag');

			return {
				message: 'Failed to create Tag',
				success: false,
				form
			};
		}

		const { name } = form.data;

		try {
			const res = await fetch('/api/tags', {
				method: 'POST',
				body: JSON.stringify({ name })
			});

			if (!res.ok) {
				if (res.status === 400) {
					setError(form, 'name', 'Tag already exists');
				}

				return {
					message: 'Create Tag Failed!!',
					success: false,
					form
				};
			}

			return {
				message: 'Created Tag Successfully',
				success: true,
				form
			};
		} catch (error) {
			console.log('CAUGTH TAG ERROR: ', JSON.stringify(error, null, 2));

			setError(form, 'name', 'Create Tag Failed!!');

			return {
				message: 'Create Tag Failed!!',
				success: false,
				form
			};
		}
	},
	deleteTag: async ({ request, fetch }) => {
		const data = await request.formData();

		const id = data.get('id');

		if (!id) {
			fail(400, { id: 'Invalid tag id' });

			return {
				message: 'Failed to delete tag',
				success: false
			};
		}

		try {
			const res = await fetch('/api/tags', {
				method: 'DELETE',
				body: JSON.stringify({ id })
			});

			if (!res.ok) {
				return {
					message: 'Failed to delete tag',
					success: false
				};
			}

			return {
				message: 'Tag deleted successfully',
				success: true
			};
		} catch (error) {
			console.error('Failed to delete tag: ', JSON.stringify(error, null, 2));

			return {
				message: 'Failed to delete tag',
				success: false
			};
		}
	}
} satisfies Actions;

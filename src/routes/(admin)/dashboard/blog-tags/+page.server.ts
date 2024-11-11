import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogTagsSchema } from './schema';
import db from '$lib/database';

export const actions = {
	addTag: async (event) => {
		const form = await superValidate(event, zod(blogTagsSchema));

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
			const tag = await db.tag.findUnique({ where: { name: name } });

			console.log(tag);

			if (tag && form.data.name.toLowerCase() === tag.name.toLowerCase()) {
				setError(form, 'name', 'Tag already exists.');

				return {
					message: 'Tag already exists.',
					success: false,
					form
				};
			}

			const adminSession = event.cookies.get('adminSession');

			const author = await db.user.findUnique({
				where: {
					authToken: adminSession
				}
			});

			// console.log('AUTHOR: ', author);

			// console.log('EVENT AUTHOR OBJECT: ', JSON.stringify(event.locals.user, null, 2));

			await db.tag.create({
				data: {
					name,
					authorId: author?.id as string
				}
			});

			return {
				message: 'Created Tag Successfully',
				success: true,
				form
			};

			// console.log('Created Tag Successfully');
		} catch (error) {
			console.log('CAUGTH TAG ERROR: ', JSON.stringify(error, null, 2));

			setError(form, 'name', 'Create Tag Failed!!');

			console.log('Created Tag Failed');

			return {
				message: 'Create Tag Failed!!',
				success: false,
				form
			};
		}

		// console.log('Created Tag Successfully');
	}
} satisfies Actions;

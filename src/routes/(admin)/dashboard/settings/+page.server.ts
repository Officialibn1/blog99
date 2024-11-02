import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { passwordSettingsSchema } from './schema';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(passwordSettingsSchema));

		if (!form.valid) {
			console.log('Failed to create new password!');

			return {
				message: 'Failed to create new password!',
				form
			};
		}

		console.log('Changed password successfully.');

		return {
			message: 'Changed password successfully.',
			form
		};
	}
} satisfies Actions;

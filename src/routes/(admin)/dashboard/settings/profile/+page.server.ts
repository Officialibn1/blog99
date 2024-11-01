import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { profileSettingsFormSchema } from './schema';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(profileSettingsFormSchema));

		if (!form.valid) {
			console.log('Failed To Edit Profile: ', JSON.stringify(form, null, 2));

			return {
				message: 'Failed To Edit Profile',
				form
			};
		}

		console.log('Edit Profile Successfully: ', JSON.stringify(form, null, 2));

		return {
			message: 'Edit Profile Successfully',
			form
		};
	}
} satisfies Actions;

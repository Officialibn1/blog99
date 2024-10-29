import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerFormSchama } from './schema';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerFormSchama));

		console.log(JSON.stringify(form, null, 2));

		if (!form.valid) {
			return {
				message: 'Failed to Register',
				form
			};
		}

		return {
			message: 'Registeration Successfull',
			form
		};
	}
} satisfies Actions;

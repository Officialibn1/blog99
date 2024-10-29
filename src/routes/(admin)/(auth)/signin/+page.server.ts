import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signInFormSchema } from './schema';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signInFormSchema));

		console.log(JSON.stringify(form));

		if (!form.valid) {
			return fail(400, {
				message: 'Error Signing In',
				form
			});
		}

		return {
			message: 'Sign In Successfully',
			form
		};
	}
} satisfies Actions;

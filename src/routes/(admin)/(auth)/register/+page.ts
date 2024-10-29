import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerFormSchama } from './schema';

export const load: PageLoad = async () => {
	const form = await superValidate(zod(registerFormSchama));

	return {
		form
	};
};

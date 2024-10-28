import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageLoad } from './$types';
import { contactFormSchema } from './schema';

export const load: PageLoad = async () => {
	const form = await superValidate(zod(contactFormSchema));

	return {
		form
	};
};

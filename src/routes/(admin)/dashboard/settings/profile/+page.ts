import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { profileSettingsFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const ssr = false;

export const load: PageLoad = async () => {
	const form = await superValidate(zod(profileSettingsFormSchema));

	return {
		form
	};
};

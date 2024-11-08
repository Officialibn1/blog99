import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogTagsSchema } from './schema';

export const ssr = false;

export const load: PageLoad = async () => {
	const form = await superValidate(zod(blogTagsSchema));

	return {
		form
	};
};

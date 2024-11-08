import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { createBlogFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { tags } from '$lib/dummy-datas/tags';

export const ssr = false;

export const load: PageLoad = async () => {
	const form = await superValidate(zod(createBlogFormSchema));

	return {
		form,
		tags
	};
};

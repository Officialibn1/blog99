import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogTagsSchema } from './schema';
import type { Tag } from '@prisma/client';

export const ssr = false;

export const load: PageLoad = async ({ fetch, depends }) => {
	const form = await superValidate(zod(blogTagsSchema));

	const tagsResponse = await fetch('/api/tags');

	depends(`tags:PageData`);

	const tags: Tag[] = await tagsResponse.json();

	return {
		form,
		tags
	};
};

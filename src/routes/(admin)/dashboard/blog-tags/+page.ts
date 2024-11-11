import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { blogTagsSchema } from './schema';

export const ssr = false;

type Tag = {
	name: string;
	id: string;
	authorId: string;
	blogsIds: string[];
	createdAt: Date;
	updatedAt: Date;
};

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

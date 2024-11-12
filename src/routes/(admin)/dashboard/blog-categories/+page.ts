import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { categorySchema } from './schema';

export const ssr = false;

export type Category = {
	id: string;
	name: string;
	authorId: string;
	blogs: object[];
	createdAt: Date;
	updatedAt: Date;
};

export const load = (async ({ fetch }) => {
	const form = await superValidate(zod(categorySchema));

	const categoriesRes = await fetch('/api/categories');

	const categories: Category[] = await categoriesRes.json();

	return {
		form,
		categories
	};
}) satisfies PageLoad;

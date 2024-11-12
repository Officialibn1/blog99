import { superValidate } from 'sveltekit-superforms';
import type { PageLoad } from './$types';
import { createBlogFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Tag } from '@prisma/client';
import type { Category } from '../../blog-categories/+page';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const form = await superValidate(zod(createBlogFormSchema));

	const tagsRes = await fetch('/api/tags');
	const categoriesRes = await fetch('/api/categories');

	const tags: Tag[] = await tagsRes.json();
	const categories: Category[] = await categoriesRes.json();

	return {
		form,
		tags,
		categories
	};
};

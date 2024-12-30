import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import type { Blog, Category, Tag, User } from '@prisma/client';

interface FullBlogData extends Blog {
	comments: Comment[];
	category: Category;
	tags: Tag[];
	author: User;
}
export const load = (async ({ fetch, params }) => {
	const blogsResponse = await fetch(`/api/blogs/${params.slug}`);

	if (!blogsResponse.ok) {
		return error(404, 'Blog not found');
	}

	const { markdown, id }: FullBlogData = await blogsResponse.json();

	const blogHtml = await marked.parse(markdown || '#Failed to fetch data');

	return {
		id,
		blogHtml
	};
}) satisfies PageServerLoad;

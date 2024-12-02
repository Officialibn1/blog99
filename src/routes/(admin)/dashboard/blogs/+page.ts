import type { PageLoad } from './$types';
import type { Blog, Comment } from '@prisma/client';

export const ssr = false;

export interface BlogWithComments extends Blog {
	comments: Comment[];
}

export const load = (async ({ fetch, depends }) => {
	const blogsResponse = await fetch(`/api/blogs`);

	depends(`blogs:DashboardData`);

	const blogs: BlogWithComments[] = await blogsResponse.json();

	return {
		blogs
	};
}) satisfies PageLoad;

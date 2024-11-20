import type { Blog, Category, Tag, User } from '@prisma/client';
import type { PageServerLoad } from './$types';

export interface BlogWithComments extends Blog {
	comments?: Comment[];
	tags: Tag[];
	category?: Category;
	author: User;
}

export const load = (async ({ fetch }) => {
	try {
		const response = await fetch('/api/public/blogs');

		const blogs: BlogWithComments[] = await response.json();

		return {
			blogs,
			success: true
		};
	} catch (error) {
		console.error(error);

		return {
			blogs: [],
			success: false
		};
	}
}) satisfies PageServerLoad;

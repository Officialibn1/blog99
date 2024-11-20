import type { PageServerLoad } from './$types';

export interface BlogWithComments {
	id: string;
	title: string;
	slug: string;
	createdAt: Date;
	tags: {
		name: string;
	}[];
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

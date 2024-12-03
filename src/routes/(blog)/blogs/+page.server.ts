import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export interface BlogWithComments {
	id: string;
	title: string;
	slug: string;
	thumbnail: string;
	markdown: string;
	createdAt: Date;
	tags: {
		name: string;
	}[];
}

export const load = (async ({ fetch }) => {
	const response = await fetch('/api/public/blogs');

	if (!response.ok) {
		console.log(response);

		if (response.status === 400) {
			return error(400, 'Connection time out, could not connect to the server');
		}

		return error(response.status, 'Something went wrong');
	}

	const blogs: BlogWithComments[] = await response.json();

	return {
		blogs,
		success: true
	};
}) satisfies PageServerLoad;

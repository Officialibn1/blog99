import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`/api/public/blogs`);

	const blogs = await response.json();

	return { blogs };
}) satisfies PageServerLoad;

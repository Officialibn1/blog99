import type { LayoutLoad } from './$types';

export const load = (async () => {
	const data: string[] = [];
	return {
		data
	};
}) satisfies LayoutLoad;

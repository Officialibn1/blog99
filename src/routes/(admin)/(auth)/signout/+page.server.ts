import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/database';

export const load = (async () => {
	throw redirect(303, '/signin');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies }) => {
		const authToken = cookies.get('adminSession');

		if (!authToken) {
			throw redirect(303, '/signin');
		}

		await db.user.update({
			where: { authToken },
			data: { authToken: null }
		});

		cookies.set('adminSession', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(303, '/signin');
	}
} satisfies Actions;

import { validateUsers, type User } from '$lib/utils';
import type { Blog, Subscriber, Traffic } from '@prisma/client';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ fetch }) => {
	const fetchUsers = async () => {
		const response = await fetch(
			`https://dummyjson.com/users?limit=15&select=firstName,lastName,weight,height,age`
		);

		const { users } = await response.json();

		if (!Array.isArray(users)) {
			return [];
		}

		const validatedUsers: User[] = [];

		for (const user of users) {
			if (!validateUsers(user)) {
				break;
			}

			validatedUsers.push(user);
		}

		return validatedUsers;
	};

	const fetchBlogs = async () => {
		const response = await fetch(`/api/blogs`);

		const data: Blog[] = await response.json();

		return data;
	};

	const fetchSubscribers = async () => {
		const response = await fetch(`/api/subscribers`);

		const data: Subscriber[] = await response.json();

		return data;
	};

	const fetchTraffic = async () => {
		const response = await fetch(`/api/traffic`);

		const data: Traffic[] = await response.json();

		return data;
	};

	return {
		users: fetchUsers,
		blogs: fetchBlogs,
		subscribers: fetchSubscribers,
		traffic: fetchTraffic
	};
}) satisfies PageLoad;

import { marked } from 'marked';
// import type { BlogWithComments } from '../+page.server';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { commentFormSchema } from './schema';
import db from '$lib/database';
import type { Blog, Category, Comment, Tag, User } from '@prisma/client';

export interface FullBlogData extends Blog {
	comments: Comment[];
	category: Category;
	tags: Tag[];
	author: User;
}

export interface SimilarBlogs {
	id: string;
	createdAt: Date;
	title: string;
	slug: string;
	thumbnail: string;
	categoryId: string;
	tags: {
		name: string;
	}[];
}

export const load = (async ({ fetch, params, cookies }) => {
	const subscriberSession = cookies.get('subscribersSession');

	const response = await fetch(`/api/public/blogs/${params.slug}`);

	const { markdown, ...blog }: FullBlogData = await response.json();

	const blogsResponse = await fetch('/api/public/blogs');

	const blogs: SimilarBlogs[] = await blogsResponse.json();

	const blogHtml = await marked.parse(markdown || '#Failed to fetch data');

	if (subscriberSession) {
		const subscriber = await db.subscriber.findUnique({ where: { authToken: subscriberSession } });

		const commentForm = await superValidate(zod(commentFormSchema), {
			defaults: {
				comment: '',
				blogId: blog.id,
				subscribersId: subscriber ? subscriber.id : ''
			}
		});

		return {
			blog,
			blogs,
			blogHtml,
			commentForm,
			subscriber
		};
	} else {
		const commentForm = await superValidate(zod(commentFormSchema), {
			defaults: {
				comment: '',
				blogId: blog.id,
				subscribersId: ''
			}
		});

		return {
			blog,
			blogs,
			blogHtml,
			commentForm,
			subscriber: null
		};
	}
}) satisfies PageServerLoad;

export const actions = {
	addComment: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(commentFormSchema));

		if (!form.valid) {
			setError(form, 'comment', 'Failed to add cooment.');

			return;
		}

		const subscribersSession = cookies.get('subscribersSession');

		if (!subscribersSession) {
			setError(form, 'comment', 'Failed to add cooment.');

			return;
		}

		const subscriber = await db.subscriber.findUnique({ where: { authToken: subscribersSession } });

		if (!subscriber || subscriber.id !== form.data.subscribersId) {
			setError(form, 'subscribersId', 'User not found.');
		}

		console.log(form);
	}
} satisfies Actions;

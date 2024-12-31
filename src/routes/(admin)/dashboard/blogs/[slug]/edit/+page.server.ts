import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { editBlogFormSchema } from './schema';
import type { Blog, Category, Tag } from '@prisma/client';

export const load = (async ({ fetch, params: { slug } }) => {
	const response = await fetch(`/api/blogs/${slug}`);

	const blog: Blog = await response.json();

	const form = await superValidate(zod(editBlogFormSchema), {
		defaults: {
			title: blog.title,
			description: blog.description,
			tags: blog.tagsIds,
			category: blog.categoryId,
			content: blog.markdown,
			published: blog.published
		}
	});

	const fetchTags = async () => {
		const tagsRes = await fetch('/api/tags');
		const tags: Tag[] = await tagsRes.json();

		return tags;
	};

	const fetchCategories = async () => {
		const categoriesRes = await fetch('/api/categories');
		const categories: Category[] = await categoriesRes.json();

		return categories;
	};

	return {
		form,
		blog,
		tags: await fetchTags(),
		categories: await fetchCategories()
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch, params: { slug } }) => {
		const form = await superValidate(request, zod(editBlogFormSchema));

		if (!form.valid) {
			console.log('Failed to update blog');

			return {
				message: 'Failed to update blog',
				success: false
			};
		}

		const { data } = form;

		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('content', data.content);
		formData.append('published', data.published.toString());
		formData.append('tags', JSON.stringify(data.tags));
		formData.append('category', data.category);

		if (data.thumbNail) {
			formData.append('thumbNail', data.thumbNail);

			console.log('Append Thimbnail');
		}

		try {
			const res = await fetch(`/api/blogs/${slug}`, {
				method: 'PUT',
				body: formData
			});

			console.log(res);

			if (!res.ok) {
				console.log('Failed to update blog');

				if (res.status === 400) {
					return fail(400, {
						message: 'Something went wrong!',
						success: false
					});
				}

				if (res.status === 404) {
					return fail(404, {
						message: 'Blog not found.',
						success: false
					});
				}

				if (res.status === 500) {
					return fail(500, {
						message: 'Failed to update blog',
						success: false
					});
				}

				console.log('Updated blog successfully');

				return {
					message: 'Updated blog successfully',
					success: true
				};
			}
		} catch (error) {
			console.log('Error updating Blog: ', error);

			return {
				message: 'Failed to create Blog',
				success: false
			};
		}
	}
} satisfies Actions;

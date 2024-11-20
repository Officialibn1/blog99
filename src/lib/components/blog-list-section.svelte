<script lang="ts">
	import db from '$lib/database';
	import BlogSectionCard from './blog-section-card.svelte';
	import { Button } from './ui/button';

	type Props = {
		blogs: {
			id: string;
			title: string;
			slug: string;
			createdAt: Date;
			tags: {
				name: string;
			}[];
		}[];
	};

	const { blogs }: Props = $props();
</script>

<section>
	<div class="header">
		<h1>News</h1>

		<Button variant="secondary">View All</Button>
	</div>

	<div class="content-grid">
		{#each blogs as blog (`home-blogs-${blog.id}`)}
			<BlogSectionCard {blog} />
		{/each}
	</div>
</section>

<style lang="postcss">
	section {
		@apply w-full flex flex-col gap-5 my-20;
	}

	.header {
		@apply flex items-center gap-5 justify-between;
	}

	.header > h1 {
		@apply text-2xl font-medium;
		font-family: 'Open Sans', sans-serif;
	}

	.content-grid {
		@apply grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3;
	}

	/* .content-grid > div {
		@apply aspect-video md:aspect-auto md:h-80 lg:h-96 bg-green-100/50 rounded-md;
	} */
</style>

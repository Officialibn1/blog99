<script>
	import BlogSectionCard from './blog-section-card.svelte';
	import { Button } from './ui/button';
	const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<section>
	<div class="header">
		<h1>News</h1>

		<Button variant="secondary">View All</Button>
	</div>

	<div class="content-grid">
		{#each nums.slice(0, 4) as num, i}
			<BlogSectionCard id={num * i} />
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
		@apply grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
	}

	/* .content-grid > div {
		@apply aspect-video md:aspect-auto md:h-80 lg:h-96 bg-green-100/50 rounded-md;
	} */
</style>

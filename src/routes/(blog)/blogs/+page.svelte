<script lang="ts">
	import BlogCard from '$lib/components/blog-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
</script>

<section>
	<!-- <aside>
		<h1>Filters</h1>

		<div class="filter-group">
			<h2>Categories</h2>

			<div class="flex gap-2">
				<Label for="news">News</Label>
				<Checkbox id="news" value="news" />
			</div>

			<div class="flex gap-2">
				<Label for="sports">Sports</Label>
				<Checkbox id="sports" value="sports" />
			</div>

			<div class="flex gap-2">
				<Label for="entertainment">Entertainment</Label>
				<Checkbox id="news" value="news" />
			</div>

			<div class="flex gap-2">
				<Label for="jists">Jist's</Label>
				<Checkbox id="jists" value="jists" />
			</div>

			<div class="flex gap-2">
				<Label for="music">Music</Label>
				<Checkbox id="music" value="music" />
			</div>

			<div class="flex gap-2">
				<Label for="fashion">Fashion</Label>
				<Checkbox id="fashion" value="fashion" />
			</div>
		</div>

		<div class="filter-group">
			<h2>Order By</h2>

			<RadioGroup>
				<div class="flex gap-2">
					<Label for="newest">Newest</Label>
					<RadioGroupItem id="newest" value="newest" />
				</div>

				<div class="flex gap-2">
					<Label for="old">Old</Label>
					<RadioGroupItem id="old" value="old" />
				</div>

				<div class="flex gap-2">
					<Label for="trending">Trending</Label>
					<RadioGroupItem id="trending" value="trending" />
				</div>
			</RadioGroup>
		</div>
	</aside> -->

	<div class="main-content">
		<header>
			<form>
				<Input />
				<!-- class="bg-green-600 hover:bg-green-600/80" -->
				<Button variant="secondary" class="shadow-sm">Search</Button>
			</form>
		</header>

		<div class="cards-wrapper">
			{#if data.blogs.length > 0}
				{#each data.blogs as blog (`blogs-page-${blog.id}`)}
					<BlogCard {blog} />
				{/each}
			{:else}
				<h1 class="text-3xl font-medium text-center md:col-span-2 lg:col-span-3 xl:col-span-4">
					There are no blogs
				</h1>
			{/if}
		</div>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex gap-10 w-full mt-10 lg:mt-20;
	}

	/* aside {
		@apply hidden md:flex flex-col gap-10 w-1/5;
	}

	aside > h1 {
		@apply text-2xl font-semibold;
	}

	.filter-group {
		@apply flex flex-col gap-3;
	}

	.filter-group > h2 {
		@apply text-lg font-medium;
	}

	.filter-group div {
		@apply flex flex-row-reverse gap-2 justify-end items-center w-full;
	} */

	.main-content {
		@apply flex flex-col w-full gap-10;
	}

	header {
		@apply w-full flex;
	}

	header > form {
		@apply flex w-full  items-center gap-5;
	}

	header > form > input {
		@apply flex-1;
	}

	.cards-wrapper {
		@apply grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
	}
</style>

<script lang="ts">
	import BlogGrid from '$lib/components/blog-grid.svelte';
	import BlogListSection from '$lib/components/blog-list-section.svelte';
	import Hero from '$lib/components/hero.svelte';
	import HomeCategoriesCards from '$lib/components/home-categories-cards.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};
	const { data }: Props = $props();
</script>

<Hero />

<!-- <BlogGrid /> -->

<BlogListSection blogs={data.blogs} />

<!-- <HomeCategoriesCards /> -->

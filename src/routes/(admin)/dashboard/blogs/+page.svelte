<script lang="ts">
	import type { PageData } from './$types';
	import BlogsTable from './blogs-table.svelte';

	const { data }: { data: PageData } = $props();
</script>

<section>
	<BlogsTable />
</section>

<style lang="postcss">
	section {
		@apply w-full h-full;
	}
</style>

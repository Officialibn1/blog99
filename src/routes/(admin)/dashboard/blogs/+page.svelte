<script lang="ts">
	import type { PageData } from './$types';
	import BlogsTable from './blogs-table.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
</script>

<section>
	<BlogsTable blogs={data.blogs} />
</section>

<style lang="postcss">
	section {
		@apply w-full h-full;
	}
</style>

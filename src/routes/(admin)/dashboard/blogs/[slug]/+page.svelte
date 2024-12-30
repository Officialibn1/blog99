<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Pen } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	console.log(data);
</script>

<section>
	<header>
		<Button
			class="flex items-center gap-3"
			onclick={() => goto(`/dashboard/blogs/${data.id}/edit`)}
		>
			<Pen size={18} color="#fff" />

			Edit Blog
		</Button>
	</header>

	<div class="blog-content-container">
		<div class="blog-content">
			{@html data.blogHtml}
		</div>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col gap-10  max-h-screen overflow-y-auto relative;

		header {
			@apply flex justify-end sticky top-0 left-0 w-full pt-8;
		}

		> div {
			@apply flex flex-col sm:flex-row gap-5 lg:gap-10 w-full;
		}
	}
</style>

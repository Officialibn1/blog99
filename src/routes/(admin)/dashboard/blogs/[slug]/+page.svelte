<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<section>
	<h1>Dashboard Blog Page</h1>
</section>

<style lang="postcss">
	section {
		@apply w-full;
	}
</style>

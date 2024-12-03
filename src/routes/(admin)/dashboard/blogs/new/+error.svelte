<script lang="ts">
	import { page } from '$app/stores';
</script>

<section>
	<h1>
		{$page.status}
	</h1>

	<p>
		{$page.error?.message}
	</p>
</section>

<style lang="postcss">
	section {
		@apply w-full h-full flex flex-col items-center justify-center gap-10;
	}

	h1 {
		@apply text-3xl font-semibold text-red-500;
	}

	p {
		@apply text-lg font-medium;
	}
</style>

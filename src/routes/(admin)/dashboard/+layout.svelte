<script lang="ts">
	import DashbaordSidenav from '$lib/components/dashbaord-sidenav.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<section>
	<DashbaordSidenav />

	<div>
		{@render children()}
	</div>
</section>

<style lang="postcss">
	section {
		@apply w-full flex;

		& div {
			@apply flex-1;
		}
	}
</style>

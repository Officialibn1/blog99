<script lang="ts">
	import SettingsSideNav from '$lib/components/settings-side-nav.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<section>
	<SettingsSideNav />
	{@render children()}
</section>

<style lang="postcss">
	section {
		@apply flex gap-5 h-full;
	}
</style>

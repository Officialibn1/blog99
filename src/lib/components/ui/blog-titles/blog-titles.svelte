<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		className?: string;
		children: any;
	};

	let { children, className }: Props = $props();
</script>

<h1 class={cn('text-2xl font-medium capitalize', className)}>
	{@render children()}
</h1>

<style lang="postcss">
	h1 {
		font-family: 'Open Sans', sans-serif;
	}
</style>

<script lang="ts">
	import { Card, CardHeader } from './ui/card';
	import Separator from './ui/separator/separator.svelte';
</script>

<section>
	<Card class="w-full h-full min-w-96">
		<CardHeader>
			<h1 class="font-semibold font-openSans">Traffic Overview</h1>
		</CardHeader>

		<Separator class="my-3" />
	</Card>
</section>

<style lang="postcss">
	section {
		@apply aspect-video overflow-x-scroll md:col-span-3;
	}
</style>

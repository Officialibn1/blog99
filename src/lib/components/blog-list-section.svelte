<script>
	import { Button } from './ui/button';
</script>

<section>
	<div class="header">
		<h1>News</h1>

		<Button>View All</Button>
	</div>

	<div class="content-grid">
		<div></div>
		<div></div>
		<div></div>
	</div>
</section>

<style lang="postcss">
	section {
		@apply w-full flex flex-col gap-5 my-20;
	}

	.header {
		@apply flex items-center gap-5;
	}

	.header > h1 {
		@apply text-2xl font-medium;
		font-family: 'Open Sans', sans-serif;
	}

	.content-grid {
		@apply grid gap-5 md:grid-cols-3;
	}

	.content-grid > div {
		@apply aspect-video md:aspect-auto md:h-80 lg:h-96 bg-green-100/50 rounded-md;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
</script>

<section>
	<h1>Error Code: {$page.status}</h1>

	<p>Error Message: {$page.error?.message}❗️ ❗️</p>
</section>

<style lang="postcss">
	section {
		@apply w-full h-full flex flex-col gap-5 items-center justify-center;

		& h1 {
			@apply text-5xl font-semibold tracking-wider leading-loose;
		}

		& p {
			@apply text-2xl font-medium tracking-wider;
		}
	}
</style>

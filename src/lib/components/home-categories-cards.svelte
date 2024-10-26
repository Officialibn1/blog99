<script lang="ts">
	const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<section>
	<h1>CATEGORIES</h1>

	<div class="flex-container max-w-[740px]">
		{#each nums as num, i}
			<a href="/" class="category-card">
				<p>Card Content {num * i}</p>
			</a>
		{/each}
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col items-center gap-8;
	}

	section > h1 {
		@apply md:text-2xl lg:text-3xl font-medium tracking-wider;
	}

	.flex-container {
		@apply flex gap-3 lg:gap-4 flex-wrap w-full justify-center;
	}

	.category-card {
		@apply border rounded-md text-sm lg:text-base p-2 md:p-3 lg:p-4 hover:shadow-md  md:font-medium tracking-wide duration-200 w-fit odd:bg-green-100/30 even:bg-purple-100/30;
	}
</style>

<main>
	<div class="hero-text z-[5]">
		<h2 class="text-3xl font-medium">Welcome To</h2>
		<h1 class="text-4xl font-semibold">
			Blog <span class="text-green-900 tracking-widest">9ja</span>
		</h1>
		<p class="text-lg">
			The best place to stay updated on all your latest news, jist's and trending updates.
		</p>
	</div>

	<img src="/nigeria-map.png" alt="" />
</main>

<style lang="postcss">
	main {
		@apply relative flex items-center justify-center w-full h-96 mt-20;
	}

	.hero-text {
		@apply w-full h-full  flex flex-col gap-2  items-center mt-10 text-center;
	}

	.hero-text > p {
		@apply lg:w-1/2 mt-10;
	}

	main > img {
		@apply absolute inset-0 m-auto h-full opacity-15;
		aspect-ratio: 3/2;
	}
</style>

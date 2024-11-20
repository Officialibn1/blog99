<main>
	<hgroup class="z-[5]">
		<h2 class="text-3xl lg:text-5xl font-medium">Welcome To</h2>
		<h1 class="text-4xl lg:text-6xl font-semibold">
			Blog <span class="text-green-900 tracking-widest">9ja</span>
		</h1>
		<p class="text-lg">
			The best place to stay updated on all your latest news, jist's and trending updates.
		</p>
	</hgroup>

	<img src="/nigeria-map.png" alt="" />
</main>

<style lang="postcss">
	main {
		@apply relative flex items-center justify-center w-full h-96 lg:h-screen mt-20;
	}

	hgroup {
		@apply w-full h-full lg:h-fit  flex flex-col gap-2  items-center mt-10 lg:-mt-64 text-center;
	}

	hgroup > p {
		@apply lg:w-1/2 mt-10 capitalize;
	}

	main > img {
		@apply absolute inset-0 m-auto h-full opacity-15;
		aspect-ratio: 3/2;
	}
</style>

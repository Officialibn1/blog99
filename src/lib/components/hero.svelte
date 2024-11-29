<main>
	<hgroup class="z-[5]">
		<!-- <h2 class="text-3xl lg:text-5xl font-medium">Welcome To</h2> -->
		<h1>
			Blog <span>9ja</span>
		</h1>
		<p>The best place to stay updated on all your latest news, jist's and trending updates.</p>
	</hgroup>

	<img src="/nigeria-map.png" alt="" class="lg:aspect-[3/2]" />
</main>

<!-- aspect-ratio: 3/2; -->

<style lang="postcss">
	main {
		@apply relative flex items-center justify-center w-full h-96 lg:h-screen mt-20;
	}

	hgroup {
		@apply w-full h-full lg:h-fit flex flex-col gap-2 items-center mt-16 lg:-mt-64 text-center;
	}

	hgroup h1 {
		@apply text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-700/80 via-gray-900/90 to-gray-800/85 py-3 animate-bounce;

		& span {
			@apply text-transparent bg-clip-text bg-gradient-to-br from-green-600/60 via-green-900/65 to-green-700/85 tracking-wider;
		}
	}

	hgroup > p {
		@apply lg:w-1/2 mt-5 capitalize md:text-lg text-base font-medium text-gray-800/70 w-3/4 md:w-1/2;
	}

	main > img {
		@apply absolute inset-0 m-auto h-full opacity-35;
	}
</style>

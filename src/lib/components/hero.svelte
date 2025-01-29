<script lang="ts">
	import { page } from '$app/stores';
	import Badge from './ui/badge/badge.svelte';

	type Blog = {
		id: string;
		title: string;
		slug: string;
		createdAt: Date;
		markdown: string;
		thumbnail: string;
		tags: {
			name: string;
		}[];
	};

	let blogs: Blog[] = $derived($page.data.blogs);
</script>

<main>
	<div>
		<div>
			<h1>
				{blogs[0].title}
			</h1>

			<div>
				{#each blogs[0].tags as tag, i}
					<Badge variant="secondary">
						{tag.name}
					</Badge>
				{/each}
			</div>
		</div>

		<img src={blogs[0].thumbnail} alt={blogs[0].title} />
	</div>

	<div>
		<div>
			<h1 class="text-2xl text-center my-auto">Place your adverts here !!</h1>
		</div>
		<div>
			<h1 class="text-2xl text-center my-auto">Place your adverts here !!</h1>
		</div>
	</div>
</main>

<!-- aspect-ratio: 3/2; -->

<style lang="postcss">
	main {
		@apply relative flex flex-col lg:flex-row w-full lg:h-fit mt-20 gap-5;

		& > div:first-child {
			@apply w-full h-full flex-1 relative rounded-xl overflow-hidden shadow-lg;

			h1 {
				@apply text-lg md:text-2xl font-bold tracking-wide text-white;
			}

			& > div {
				@apply absolute left-0 bottom-0 bg-black/40 w-full p-2 py-4 md:px-4 md:py-8 backdrop-blur-sm;

				& > div {
					@apply flex flex-wrap gap-3 mt-4;
				}
			}

			img {
				@apply rounded-xl w-full;
			}
		}

		& > div:last-child {
			@apply grid grid-cols-2 lg:grid-cols-1 gap-5 lg:w-1/3;

			& > div {
				@apply flex-1 border rounded-xl h-full aspect-video lg:aspect-auto flex justify-center;
			}
		}
	}
</style>

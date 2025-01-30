<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowUpRight } from 'lucide-svelte';
	import Badge from './ui/badge/badge.svelte';
	import { buttonVariants } from './ui/button';

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
	<div class="group">
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

				<Badge class="ml-auto group-hover:animate-bounce" variant="outline">
					<a href={`/blogs/${blogs[0].slug}`} class="flex gap-2 items-center text-white">
						Read More <ArrowUpRight color="#fff" size={20} />
					</a>
				</Badge>
			</div>
		</div>

		<img src={blogs[0].thumbnail} alt={blogs[0].title} />
	</div>

	<div>
		<div>
			<div class="adds-container group">
				<h1>Advert Banner</h1>

				<p>Contact us to place your advertisement here.</p>

				<a href="/" class="group-hover:animate-bounce"> Contact Us </a>
			</div>
		</div>

		<div>
			<div class="adds-container group">
				<h1>Advert Banner</h1>

				<p>Contact us to place your advertisement here.</p>

				<a href="/" class="group-hover:animate-bounce"> Contact Us </a>
			</div>
		</div>
	</div>
</main>

<!-- aspect-ratio: 3/2; -->

<style lang="postcss">
	main {
		@apply relative flex flex-col lg:flex-row w-full lg:h-fit mt-20 gap-5;

		& > div:first-child {
			@apply w-full h-full flex-1 relative rounded-xl overflow-hidden shadow-lg cursor-pointer;

			h1 {
				@apply text-lg md:text-2xl font-bold tracking-wide text-white;
			}

			& > div {
				@apply absolute left-0 bottom-0 z-10 bg-black/40 w-full p-2 py-4 md:px-4 md:py-8 backdrop-blur-sm;

				& > div {
					@apply flex flex-wrap gap-3 mt-4;
				}
			}

			img {
				@apply rounded-xl w-full hover:scale-105 duration-200;
			}
		}

		& > div:last-child {
			@apply grid grid-cols-2 lg:grid-cols-1 gap-5 lg:w-1/3;

			& > div {
				@apply flex-1 border rounded-xl h-full aspect-video lg:aspect-auto flex justify-center p-3;

				& .adds-container {
					@apply flex flex-col gap-2 text-center justify-center;

					h1 {
						@apply text-2xl font-semibold;
					}

					p {
						@apply text-lg text-gray-600;
					}

					a {
						@apply bg-foreground text-white w-fit px-4 py-2 rounded-md font-semibold mt-5 mx-auto hover:bg-transparent hover:border-foreground border border-transparent hover:text-foreground duration-200;
					}
				}
			}
		}
	}
</style>

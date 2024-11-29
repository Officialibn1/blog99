<script lang="ts">
	import { Content, Footer, Header, Root, Title } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';

	import { goto } from '$app/navigation';
	import { Badge } from './ui/badge';
	import { formatdate } from '$lib/utils';

	type Props = {
		blog: {
			id: string;
			title: string;
			slug: string;
			createdAt: Date;
			thumbnail: string;
			tags: {
				name: string;
			}[];
		};
	};

	let { blog }: Props = $props();
</script>

<Root
	class="shadow-none cursor-pointer md:hover:shadow-md duration-200 overflow-hidden"
	onclick={() => goto(`/blogs/${blog.slug}`)}
>
	<Content class="p-0 flex sm:flex-col">
		<Header class="w-2/5 aspect-square p-0 overflow-hidden sm:w-full">
			<img
				class=" w-full h-full"
				src={blog.thumbnail || '/placeholder-image.avif'}
				alt="Card_Placeholder_Image"
			/>
		</Header>

		<!-- <Separator orientation="vertical" class="lg:hidden" />
		<Separator class="hidden sm:flex " /> -->

		<div class="flex flex-col">
			<div class="p-2">
				<Title class="leading-relaxed mt-0">{blog.title}</Title>
			</div>

			<Footer class="flex flex-col gap-2 p-2 items-start">
				<div class="flex flex-wrap gap-2 px-0">
					{#each blog.tags as tag, i (`home-blogs-card-${i}`)}
						<Badge variant="secondary" class="text-gray-700">{tag.name}</Badge>
					{/each}
				</div>

				<p class="text-xs font-medium text-gray-400">{formatdate(blog.createdAt)} • 2 min read</p>
			</Footer>
		</div>
	</Content>
</Root>

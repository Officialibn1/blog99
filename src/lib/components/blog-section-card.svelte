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
			markdown: string;
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
	class="shadow-none cursor-pointer md:hover:shadow-lg duration-200 overflow-hidden group"
	onclick={() => goto(`/blogs/${blog.slug}`)}
>
	<Content class="p-0 flex sm:flex-col h-full overflow-hidden ">
		<Header class="w-2/5 aspect-square p-0 overflow-hidden sm:w-full">
			<img
				class=" w-full h-full group-hover:scale-105 duration-300"
				src={blog.thumbnail || '/placeholder-image.avif'}
				alt="Card_Placeholder_Image"
			/>
		</Header>

		<!-- <Separator orientation="vertical" class="lg:hidden" />
		<Separator class="hidden sm:flex " /> -->

		<div class="p-2 pb-0">
			<Title class="leading-relaxed mt-0">{blog.title}</Title>
		</div>

		<Footer class="flex flex-col gap-2 p-2 items-start mt-auto">
			<div class="flex flex-wrap gap-2 px-0">
				{#each blog.tags as tag, i (`home-blogs-card-${i}`)}
					<Badge variant="secondary" class="text-gray-700">{tag.name}</Badge>
				{/each}
			</div>

			<p class="text-xs font-medium text-gray-400">
				{formatdate(blog.createdAt)} • {Math.ceil(blog.markdown.length / 800)} min read
			</p>
		</Footer>
	</Content>
</Root>

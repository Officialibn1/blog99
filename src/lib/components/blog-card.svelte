<script lang="ts">
	import { Content, Description, Footer, Header, Root, Title } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { goto } from '$app/navigation';
	import { cn, formatdate } from '$lib/utils';
	import { Badge } from './ui/badge';
	import type { BlogWithComments } from '../../routes/(blog)/blogs/+page.server';

	type Props = {
		blog: BlogWithComments;
		className?: string;
	};

	const { blog, className }: Props = $props();

	const { slug, title, tags, createdAt, thumbnail, markdown } = blog;
</script>

<a href={`/blogs/${slug}`} data-sveltekit-prefetch class="h-full">
	<Root
		class={cn('shadow-none md:hover:shadow-lg duration-200 cursor-pointer h-full group', className)}
	>
		<Content class="p-0 flex flex-col h-full overflow-hidden">
			<Header class="w-2/5 aspect-square p-0 overflow-hidden sm:w-full">
				<img
					src={thumbnail || '/placeholder-image.avif'}
					class=" w-full h-full rounded-md group-hover:scale-105 duration-300"
					alt="Card_Placeholder_Image"
				/>
			</Header>

			<!-- <Separator /> -->

			<div class="p-2 pb-0">
				<Title class="leading-relaxed font-semibold tracking-normal text-left mt-0">
					{title}
				</Title>
			</div>

			<Footer class="flex flex-col  gap-3 items-start mt-auto p-2">
				<div class="flex flex-wrap gap-2">
					{#each tags.slice(0, 3) as tag, i (`card-tag-${i}`)}
						<Badge variant="secondary" class="text-gray-700">{tag.name}</Badge>
					{/each}
				</div>

				<p class="text-xs font-medium text-gray-400">
					{formatdate(createdAt)} • {Math.ceil(markdown.length / 800)} min read
				</p>
			</Footer>
		</Content>
	</Root>
</a>

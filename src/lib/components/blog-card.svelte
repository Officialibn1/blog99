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

	const { slug, title, description, tags, createdAt } = blog;
</script>

<Root
	class={cn('shadow-none md:hover:shadow-md duration-200 cursor-pointer', className)}
	onclick={() => goto(`/blogs/${slug}`)}
>
	<Content class="p-0 flex flex-col h-full">
		<Header class="">
			<img src="/placeholder-image.avif" alt="Card_Placeholder_Image" />
		</Header>

		<Separator />

		<div class="p-3 pb-0">
			<Title class="leading-loose text-left">
				{title}
			</Title>

			<Description>
				{description}
			</Description>
		</div>

		<Footer class="flex flex-col  gap-3 items-start mt-auto p-3">
			<div class="flex flex-wrap gap-2">
				{#each tags as tag (tag.id)}
					<Badge variant="secondary" class="text-gray-700">{tag.name}</Badge>
				{/each}
			</div>

			<p class="text-xs font-medium text-gray-400">{formatdate(createdAt)} • 2 min read</p>
		</Footer>
	</Content>
</Root>

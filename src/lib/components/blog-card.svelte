<script lang="ts">
	import { Content, Description, Footer, Header, Root, Title } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';

	type Props = {
		id: number;
		className?: string;
	};

	let { id, className }: Props = $props();
</script>

<Root
	class={cn('shadow-none md:hover:shadow-md duration-200 cursor-pointer', className)}
	onclick={() => goto(`/blogs/${id}`)}
>
	<Content class="p-0 ">
		<Header class="">
			<img src="/placeholder-image.avif" alt="Card_Placeholder_Image" />
		</Header>

		<Separator />

		<div class="p-3 pb-0">
			<Title class="leading-loose">Card Description for {id}</Title>

			<Description>Lorem ipsum dolor, sit amet consectetur !</Description>
		</div>

		<Footer class="flex items-center  gap-3  p-3">
			<Avatar.Root>
				<Avatar.Image src="/placeholder-author.png " alt="@blog9ja" />
				<Avatar.Fallback>b9ja</Avatar.Fallback>
			</Avatar.Root>

			<div class="flex flex-col">
				<h3 class="text-sm font-medium leading-loose">Authors Name</h3>

				<p class="text-xs font-medium text-gray-400">Mav 28. 2024 • 2 min read</p>
			</div>
		</Footer>
	</Content>
</Root>

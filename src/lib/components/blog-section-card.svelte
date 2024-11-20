<script lang="ts">
	import { Content, Footer, Header, Root, Title } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';

	import { goto } from '$app/navigation';
	import { Badge } from './ui/badge';

	type Props = {
		id: number;
	};

	let { id }: Props = $props();
</script>

<Root
	class="shadow-none cursor-pointer md:hover:shadow-md duration-200 overflow-hidden"
	onclick={() => goto(`/blogs/${id}`)}
>
	<Content class="p-0 flex sm:flex-col">
		<Header class="w-1/4 p-0 overflow-hidden sm:w-full">
			<img class=" w-full h-full" src="/placeholder-image.avif" alt="Card_Placeholder_Image" />
		</Header>

		<Separator orientation="vertical" class="lg:hidden" />
		<Separator class="hidden sm:flex " />

		<div class="flex flex-col">
			<div class="p-3 pb-0">
				<Title class="leading-loose">Card Description for {id}</Title>
			</div>

			<Footer class="flex flex-col  gap-3 items-start  p-3">
				<div class="flex flex-wrap gap-2">
					<Badge variant="secondary" class="text-gray-700">Web3</Badge>
					<Badge variant="secondary" class="text-gray-700">Crypto</Badge>
					<Badge variant="secondary" class="text-gray-700">Javascript</Badge>
				</div>

				<p class="text-xs font-medium text-gray-400">Mav 28. 2024 • 2 min read</p>
			</Footer>
		</div>
	</Content>
</Root>

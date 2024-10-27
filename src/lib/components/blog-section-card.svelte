<script lang="ts">
	import { Content, Description, Footer, Header, Root, Title } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';

	type Props = {
		id: number;
	};

	let { id }: Props = $props();
</script>

<Root class="shadow-none  overflow-hidden">
	<Content class="p-0 flex sm:flex-col">
		<Header class="w-1/4 p-0 overflow-hidden sm:w-full">
			<img class=" w-full h-full" src="/placeholder-image.avif" alt="Card_Placeholder_Image" />
		</Header>

		<Separator orientation="vertical" class="lg:hidden" />
		<Separator class="hidden sm:flex " />

		<div class="flex flex-col">
			<div class="p-3 pb-0">
				<Title class="leading-loose">Card Description for {id}</Title>

				<Description class="hidden sm:block">Lorem ipsum dolor, sit amet consectetur !</Description>
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
		</div>
	</Content>
</Root>

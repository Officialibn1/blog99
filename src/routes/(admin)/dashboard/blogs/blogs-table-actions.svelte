<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 ml-8 ">
			<span class="sr-only">Open Menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>

			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
				Copy Blog Id
			</DropdownMenu.Item>
		</DropdownMenu.Group>

		<DropdownMenu.Separator />

		<DropdownMenu.Item>View Blog</DropdownMenu.Item>
		<DropdownMenu.Item>Edit Blog</DropdownMenu.Item>
		<DropdownMenu.Item>Delete Blog</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

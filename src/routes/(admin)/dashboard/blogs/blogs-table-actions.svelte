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
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 ml-8">
			<span class="sr-only">Open Menu</span>

			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content>
		<DropdownMenu.Item
			onclick={() => navigator.clipboard.writeText(id)}
			class="text-sm font-medium"
		>
			Copy Email
		</DropdownMenu.Item>

		<DropdownMenu.Separator />

		<DropdownMenu.Item class="text-sm font-medium">View</DropdownMenu.Item>

		<DropdownMenu.Item class="text-sm font-medium">Edit</DropdownMenu.Item>

		<DropdownMenu.Item class="text-sm font-medium">Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { dev } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	type Props = {
		id: string;
	};

	let { id }: Props = $props();

	const ENVIRONMENT_PATH = dev ? `http://localhost:5173` : `https://blog9ja.vercel.app`;

	const deleteCategory = async (id: string) => {
		try {
			const res = await fetch(`${ENVIRONMENT_PATH}/api/categories/`, {
				method: 'DELETE',
				body: JSON.stringify(id)
			});

			if (!res.ok) {
				toast.error(`Something went wrong on the server while deleting category`);

				return;
			}

			invalidate('categories:DashboardData');

			invalidateAll();

			toast.success(`Category Deleted Successfully`);
		} catch (error) {
			toast.error(`Something went wrong while deleting category`);
		}
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 ml-8">
			<span class="sr-only">Open Menu</span>

			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="flex flex-col gap-1">
		<DropdownMenu.Item
			on:click={() => navigator.clipboard.writeText(id)}
			class="text-sm font-medium cursor-pointer"
		>
			Copy ID
		</DropdownMenu.Item>

		<!-- <DropdownMenu.Separator /> -->

		<DropdownMenu.Item class="text-sm font-medium cursor-pointer">View</DropdownMenu.Item>

		<DropdownMenu.Item class="text-sm font-medium cursor-pointer">Edit</DropdownMenu.Item>

		<DropdownMenu.Item
			class="text-sm font-medium bg-red-300/50 text-red-800 hover:bg-red-300/15 hover:text-red-900 cursor-pointer"
		>
			<form method="POST" action="?/deleteCategory" use:enhance>
				<input hidden bind:value={id} name="categoryId" />

				<button>Delete</button>
			</form>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<script lang="ts">
	import type { User } from '$lib/utils';
	import { fade } from 'svelte/transition';
	import { Card, CardContent, CardHeader } from './ui/card';
	import Separator from './ui/separator/separator.svelte';
	import Chart from 'chart.js/auto';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Select from '$lib/components/ui/select';

	const { users }: { users: User[] | undefined } = $props();

	let ctx: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined;

	let showAge = true,
		showWeight = true,
		showHeight = true,
		chartType: 'line' | 'bar' = $state('bar');

	$effect(() => {
		if (users && ctx) {
			if (chart) {
				chart.destroy();
			}

			chart = new Chart(ctx, {
				type: chartType,
				data: {
					labels: users.map((user) => `${user.firstName} ${user.lastName}`),
					datasets: [
						{
							label: 'Age',
							data: users.map(({ age }) => age),
							borderWidth: 2,
							hidden: !showAge
						},
						{
							label: 'Height',
							data: users.map(({ height }) => height),
							borderWidth: 2,
							hidden: !showHeight
						},
						{
							label: 'Weight',
							data: users.map(({ weight }) => weight),
							borderWidth: 2,
							hidden: !showWeight
						}
					]
				},
				options: {
					animation: false,
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});
		}
	});
</script>

<Card class="w-full h-full min-w-96 overflow-hidden">
	<CardHeader class=" items-center pb-3 flex-row">
		<h1 class="font-semibold font-openSans">Traffic Overview</h1>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="border ml-auto py-[7px] px-3 font-openSans font-medium rounded-sm text-sm"
			>
				<span class="sr-only">Open Menu</span>
				Select Data's to Show
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<DropdownMenu.Item disabled class="w-44 text-sm font-medium"
					>Select Data's</DropdownMenu.Item
				>

				<DropdownMenu.Separator />

				<DropdownMenu.Item class="w-44 text-sm font-medium">View</DropdownMenu.Item>

				<DropdownMenu.Item class="w-44 text-sm font-medium">Edit</DropdownMenu.Item>

				<DropdownMenu.Item class="w-44 text-sm font-medium">Delete</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<Select.Root>
			<Select.Trigger class="w-36 ml-5 rounded-sm shadow-none font-medium font-openSans">
				<Select.Value placeholder="Chart Type" class="placeholder-gray-900" />
			</Select.Trigger>

			<Select.Content>
				<Select.Item value="bar" on:click={() => (chartType = 'bar')}>Bar</Select.Item>

				<Select.Item value="line" on:click={() => (chartType = 'line')}>Line</Select.Item>
			</Select.Content>
		</Select.Root>
	</CardHeader>

	<Separator class="mb-3" />

	<CardContent>
		<div class="chart-container w-full">
			{#key [showAge, showWeight, showHeight, chartType, users]}
				<canvas class="w-full" bind:this={ctx} width="100" height="48" in:fade></canvas>
			{/key}
		</div>
	</CardContent>
</Card>

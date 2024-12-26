<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Card, CardContent, CardHeader } from './ui/card';
	import Separator from './ui/separator/separator.svelte';
	import Chart from 'chart.js/auto';
	import * as Select from '$lib/components/ui/select';
	import type { Traffic } from '@prisma/client';
	import { getShortDay } from '$lib/utils';
	import Button from './ui/button/button.svelte';

	const { traffic }: { traffic: Traffic[] | undefined } = $props();

	let totalTraffic = $derived(traffic ? traffic.reduce((acc, { count }) => acc + count, 0) : 0);

	let ctx: HTMLCanvasElement | undefined = $state();
	let chart: Chart | undefined;

	let chartType: 'line' | 'bar' = $state('bar');

	$effect(() => {
		if (traffic && ctx) {
			if (chart) {
				chart.destroy();
			}

			chart = new Chart(ctx, {
				type: chartType,
				data: {
					labels: traffic.map(({ date }) => `${getShortDay(date)}`),
					datasets: [
						{
							label: 'Traffic',
							data: traffic.map(({ count }) => count),
							borderWidth: 2,
							backgroundColor: 'rgb(22 163 74 / 0.4)',
							borderColor: 'rgb(22 163 74 / 0.6)'
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
	<CardHeader class=" items-center pb-3 flex-row justify-between">
		<h1 class="font-semibold font-openSans">Traffic Overview</h1>

		<Button variant="secondary" class="font-mono text-xs">Total Traffic: {totalTraffic}</Button>

		<Select.Root>
			<Select.Trigger class="w-36  rounded-sm shadow-none font-medium font-openSans">
				<Select.Value asChild>
					<Select.Label class="capitalize">
						{chartType}
					</Select.Label>
				</Select.Value>
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
			{#key [chartType, traffic]}
				<canvas class="w-full" bind:this={ctx} width="100" height="48" in:fade></canvas>
			{/key}
		</div>
	</CardContent>
</Card>

<script lang="ts">
	import TrafficAnalyticsChart from '$lib/components/traffic-analytics-chart.svelte';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import DashbaordStatsCard from '$lib/components/ui/dashbaord-stats-card/dashbaord-stats-card.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';

	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<section>
	<header>
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />

		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />

		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />

		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
	</header>

	<div class="analytics-section">
		<div>
			{#await data.users()}
				<Card class="w-full aspect-video shadow-none">
					<Skeleton class="h-full w-full rounded-md" />
				</Card>
			{:then users}
				<TrafficAnalyticsChart {users} />
			{:catch error}
				<pre>
				{JSON.stringify(error, null, 2)}
			  </pre>
			{/await}
		</div>

		<Card class="aspect-square md:aspect-auto">
			<CardHeader>
				<h1 class="font-semibold font-openSans">Top Posts</h1>
			</CardHeader>

			<Separator class="my-3" />
		</Card>
	</div>
</section>

<style lang="postcss">
	section {
		@apply w-full h-full flex flex-col gap-4;

		header {
			@apply grid md:grid-cols-2 lg:grid-cols-4 gap-4;
		}
	}

	.analytics-section {
		@apply grid gap-4 md:grid-cols-4;

		& > div {
			@apply aspect-video overflow-x-scroll md:col-span-3;
		}
	}
</style>

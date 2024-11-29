<script lang="ts">
	import { goto } from '$app/navigation';
	import TrafficAnalyticsChart from '$lib/components/traffic-analytics-chart.svelte';
	import { Button } from '$lib/components/ui/button';
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

		<DashbaordStatsCard title="Avg. Time on Site" value={`4,698 Hrs`} percentage={`+20.1`} />

		<DashbaordStatsCard title="Total Blogs" value={`231`} percentage={`+20.1`} />

		<DashbaordStatsCard title="Total Subscribers" value={`1,454`} percentage={`+20.1`} />
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
					{error}
				</pre>
			{/await}
		</div>

		<Card class="aspect-square md:aspect-auto">
			<CardHeader class="flex-row justify-between items-center">
				<h1 class="font-semibold font-openSans">Top Viewed Blogs</h1>

				<Button onclick={() => goto('/dashboard/blogs')} variant="outline" class="shadow-none"
					>View All</Button
				>
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

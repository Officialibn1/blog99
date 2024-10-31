<script lang="ts">
	import TrafficAnalyticsChart from '$lib/components/traffic-analytics-chart.svelte';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import DashbaordStatsCard from '$lib/components/ui/dashbaord-stats-card/dashbaord-stats-card.svelte';
	import { Separator } from '$lib/components/ui/separator';
</script>

<section>
	<header>
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
	</header>

	<div class="analytics-section">
		<TrafficAnalyticsChart />

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
	}
</style>

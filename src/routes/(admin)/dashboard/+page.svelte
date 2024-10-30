<script lang="ts">
	import DashbaordStatsCard from '$lib/components/ui/dashbaord-stats-card/dashbaord-stats-card.svelte';
</script>

<section>
	<header>
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
		<DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} />
	</header>
</section>

<style lang="postcss">
	section {
		@apply w-full h-full;

		header {
			@apply grid lg:grid-cols-4 gap-4;
		}
	}
</style>

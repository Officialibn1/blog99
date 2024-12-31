<script lang="ts">
	import { goto } from '$app/navigation';
	import TrafficAnalyticsChart from '$lib/components/traffic-analytics-chart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardContent } from '$lib/components/ui/card';
	import DashbaordStatsCard from '$lib/components/ui/dashbaord-stats-card/dashbaord-stats-card.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<section>
	<header>
		{#await data.blogs()}
			<Card>
				<Skeleton class="h-full w-full rounded-md" />
			</Card>

			<Card>
				<Skeleton class="h-full w-full rounded-md" />
			</Card>

			<Card>
				<Skeleton class="h-full w-full rounded-md" />
			</Card>
		{:then blogs}
			<DashbaordStatsCard title="Total Blogs" value={`${blogs.length ?? 0}`} percentage={`+20.1`} />

			<DashbaordStatsCard
				title="Published Blogs"
				value={`${blogs.filter((blog) => blog.published === true).length ?? 0}`}
				percentage={`+20.1`}
			/>

			<DashbaordStatsCard
				title="Drafted Blogs"
				value={`${blogs.filter((blog) => blog.published === false).length ?? 0}`}
				percentage={`+20.1`}
			/>
		{:catch error}
			<Card>
				error fetching total blogs

				<pre>
				{JSON.stringify(error)}
			</pre>
			</Card>

			<Card>
				error fetching total blogs

				<pre>
				{JSON.stringify(error)}
			</pre>
			</Card>

			<Card>
				error fetching published blogs

				<pre>
				{JSON.stringify(error)}
			</pre>
			</Card>
		{/await}

		<!-- <DashbaordStatsCard title="Total Views" value={`45,231`} percentage={`+20.1`} /> -->

		{#await data.subscribers()}
			<Card>
				<Skeleton class="h-full w-full rounded-md" />
			</Card>
		{:then value}
			<DashbaordStatsCard
				title="Total Subscribers"
				value={`${value.length ?? 0}`}
				percentage={`+20.1`}
			/>
		{:catch error}
			<Card>
				error fetching total subscribers

				<pre>
			{JSON.stringify(error)}
		</pre>
			</Card>
		{/await}
	</header>

	<div class="analytics-section">
		<div>
			{#await data.traffic()}
				<Card class="w-full aspect-video shadow-none">
					<Skeleton class="h-full w-full rounded-md" />
				</Card>
			{:then traffic}
				<TrafficAnalyticsChart {traffic} />
			{:catch error}
				<Card class="w-full h-full">
					<pre>
						{error}
					</pre>
				</Card>
			{/await}
		</div>

		<Card class="aspect-square md:aspect-auto ">
			<CardHeader class="flex-row justify-between items-center">
				<h1 class="font-semibold font-openSans">Top Viewed Blogs</h1>

				<Button onclick={() => goto('/dashboard/blogs')} variant="outline" class="shadow-none"
					>View All</Button
				>
			</CardHeader>

			<Separator class="mt-3 mb-2" />

			<CardContent class="overflow-y-auto flex flex-col gap-4">
				{#await data.blogs()}
					{#each { length: 5 } as _}
						<Skeleton class="h-20 w-full rounded-md" />
					{/each}
				{:then blogs}
					{#each blogs
						.filter((blog) => blog.published)
						.sort(({ views: a }, { views: b }) => b - a)
						.slice(0, 5) as blog}
						<Card class="p-2 shadow-sm bg-gray-200/30">
							<h1 class="font-semibold text-sm mb-4 tracking-wide">{blog.title.slice(0, 40)}...</h1>

							<CardContent class="p-0 flex justify-between w-full items-center">
								<p class="text-sm">Views: {blog.views}</p>

								<a
									href={`/dashboard/blogs/${blog.id}`}
									class="text-xs font-medium border p-1 px-2 rounded-sm bg-white">View Blog</a
								>
							</CardContent>
						</Card>
					{/each}
				{:catch error}
					<Card>
						<pre>
							{error}
						</pre>
					</Card>
				{/await}
			</CardContent>
		</Card>
	</div>
</section>

<style lang="postcss">
	section {
		@apply w-full h-full flex flex-col gap-4;

		header {
			@apply grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-28;
		}
	}

	.analytics-section {
		@apply grid gap-4 md:grid-cols-4;

		& > div {
			@apply aspect-video overflow-x-scroll md:col-span-3;
		}
	}
</style>

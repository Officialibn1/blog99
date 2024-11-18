<script lang="ts">
	import { Card, CardContent, CardFooter, CardHeader } from '../card';

	type Props = {
		title: string;
		value: string;
		percentage: string;
	};

	let { title, value, percentage }: Props = $props();
</script>

<div>
	<Card class="w-full shadow-none">
		<CardHeader><p>{title}</p></CardHeader>
		<CardContent><h1>{value}</h1></CardContent>
		<CardFooter><span>{percentage}% from last month</span></CardFooter>
	</Card>

	<!-- <div
		class="relative w-[150px] h-[200px] bg-slate-500 before:absolute before:w-[150px] before:h-0 before:top-0 before:left-0 before:border-b-[19px] before:border-b-slate-500 before:border-l-[19px] before:border-l-gray-50 before:border-r-[19px] before:border-r-gray-50 after:absolute after:w-[150px] after:h-0 after:bottom-0 after:left-0 after:border-t-[19px] after:border-t-slate-500 after:border-l-[19px] after:border-l-gray-50 after:border-r-[19px] after:border-r-gray-50"
	>
		<h1 class="z-10 mx-auto">A Card</h1>
	</div> -->
</div>

<style lang="postcss">
	div {
		@apply flex;

		& p {
			@apply font-openSans text-sm font-medium tracking-wider;
		}

		& h1 {
			@apply text-lg font-bold tracking-wider;
		}

		& span {
			@apply text-xs font-medium text-gray-500;
		}
	}
</style>

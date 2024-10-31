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

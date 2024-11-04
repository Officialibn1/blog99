<script lang="ts">
	import { Badge } from './ui/badge';

	type Props = {
		title: string;
		className: string;
		variant: 'default' | 'secondary' | 'destructive' | 'outline' | undefined;
	};

	const { title, className, variant }: Props = $props();
</script>

<Badge class={className} {variant}>
	{title}
</Badge>

<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	let { children } = $props();

	// onNavigate((navigation) => {
	// 	if (!document.startViewTransition) return;

	// 	return new Promise((resolve) => {
	// 		document.startViewTransition(async () => {
	// 			resolve();

	// 			await navigation.complete;
	// 		});
	// 	});
	// });
</script>

<Toaster position="bottom-center" />

{@render children()}

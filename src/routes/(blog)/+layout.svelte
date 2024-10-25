<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<section class="pt-28 w-full flex flex-col gap-14">
	<Navbar />

	<div class="w-full max-w-[1224px] px-4 lg:px-10 mx-auto">
		{@render children()}
	</div>

	<Footer />
</section>

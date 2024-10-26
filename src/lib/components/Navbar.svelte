<script>
	import { BookOpenText, Menu } from 'lucide-svelte';
	import { Button } from './ui/button';
	import Icon from '@iconify/svelte';
	import Twitter from './ui/icons/Twitter.svelte';
	import WhatsApp from './ui/icons/WhatsApp.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
</script>

<nav>
	<div class="nav-content max-w-[1224px]">
		<div class="logo">
			<BookOpenText size={36} strokeWidth={1.5} />

			<h1>Blog <span>9ja</span></h1>
		</div>

		<ul class="tablet-links">
			<li>
				<a href="/">Home</a>
			</li>

			<li>
				<a href="/">Blogs</a>
			</li>

			<li>
				<a href="/">Categories</a>
			</li>

			<li>
				<a href="/">Contact Us</a>
			</li>
			<!-- <li>
				<a href="/">About Us</a>
			</li> -->
		</ul>

		<div class="social-container">
			<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc7d]">
				<Twitter />
			</Button>

			<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc7d]">
				<WhatsApp />
			</Button>
		</div>

		<Sheet.Root>
			<Sheet.Trigger class="md:hidden">
				<Button size="icon" variant="ghost">
					<Menu />
				</Button>
			</Sheet.Trigger>
			<Sheet.Content class="md:hidden py-16  flex flex-col ">
				<Sheet.Description class=" flex flex-col h-full justify-between">
					<ul class="mobile-links">
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/">Blogs</a>
						</li>
						<li>
							<a href="/">Categories</a>
						</li>
						<li>
							<a href="/">Contact Us</a>
						</li>
					</ul>

					<div class="flex gap-10 mt-14 justify-center w-full">
						<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc7d]">
							<Twitter />
						</Button>

						<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc7d]">
							<WhatsApp />
						</Button>
					</div>
				</Sheet.Description>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply fixed top-0 w-full backdrop-blur-md bg-green-50/30 z-10;
		border-bottom: 1px solid #cfe1b9;
	}

	nav > div {
		@apply mx-auto py-4 px-4 lg:py-6 lg:px-10 flex items-center justify-between;
	}

	.logo {
		@apply flex gap-3 items-center;
	}

	.logo > h1 {
		@apply text-2xl font-semibold;
	}

	.logo > h1 > span {
		@apply text-green-900;
	}

	.mobile-links {
		@apply flex flex-col gap-8 items-start;
	}

	.mobile-links a {
		@apply text-lg font-medium tracking-wider;
	}

	ul.tablet-links {
		@apply hidden md:flex gap-5 md:gap-6 lg:gap-10 items-center;
	}

	ul.tablet-links a {
		@apply text-sm lg:text-lg font-medium tracking-wider;
	}

	.social-container {
		@apply hidden md:flex items-center gap-5;
	}
</style>

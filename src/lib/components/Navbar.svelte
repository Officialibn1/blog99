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
		<a href="/" class="logo">
			<BookOpenText size={36} strokeWidth={1.5} />

			<h1>Blog <span>9ja</span></h1>
		</a>

		<ul class="tablet-links">
			<li>
				<a href="/">Home</a>
			</li>

			<li>
				<a href="/blogs">Blogs</a>
			</li>

			<li>
				<a href="/contact">Contact Us</a>
			</li>
		</ul>

		<div class="social-container">
			<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc22]">
				<Twitter />
			</Button>

			<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc22]">
				<WhatsApp />
			</Button>
		</div>

		<div class="md:hidden">
			<Sheet.Root>
				<Sheet.Trigger class="md:hidden">
					<Button size="icon" variant="ghost" class="md:hidden">
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
								<a href="/blogs">Blogs</a>
							</li>

							<li>
								<a href="/contact">Contact Us</a>
							</li>
						</ul>

						<div class="flex gap-10 mt-14 justify-center w-full">
							<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc22]">
								<Twitter />
							</Button>

							<Button variant="ghost" size="icon" class="hover:bg-[#d3e5bc22]">
								<WhatsApp />
							</Button>
						</div>
					</Sheet.Description>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</nav>

<!-- /* border-bottom: 1px solid #cfe1b9; */ -->
<style lang="postcss">
	nav {
		@apply fixed top-0 w-full backdrop-blur-md bg-white/20 z-10;
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
		@apply text-sm lg:text-lg font-semibold text-green-950 tracking-wider hover:underline underline-offset-8 duration-200;
	}

	.social-container {
		@apply hidden md:flex items-center gap-5;
	}
</style>

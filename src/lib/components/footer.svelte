<script>
	import { BookOpenText, Send } from 'lucide-svelte';
	import Twitter from './ui/icons/Twitter.svelte';
	import WhatsApp from './ui/icons/WhatsApp.svelte';
	import { Button } from './ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from './ui/separator';
</script>

<footer>
	<div class="footer-content w-full max-w-[1224px]">
		<div class="left">
			<div class="logo">
				<BookOpenText size={48} strokeWidth={1.5} />

				<h1>Blog <span>99</span></h1>
			</div>

			<div class="links">
				<h1>Contact Info:</h1>

				<ul>
					<li>
						<p>Phone: +2349038880282</p>
					</li>
					<li>
						<p>Email: officialibn001@gmail.com</p>
					</li>
				</ul>
			</div>
		</div>

		<div class="middle">
			<div class="links">
				<h1>Quick Links</h1>

				<ul>
					<li>
						<a href="/">Blogs</a>
					</li>
					<li>
						<a href="/">Contact Us</a>
					</li>
				</ul>
			</div>

			<div class="links">
				<h1>Social</h1>

				<ul>
					<li>
						<a href="/">Twitter</a>
					</li>
					<li>
						<a href="/">Facebook</a>
					</li>
					<li>
						<a href="/">WhatsApp</a>
					</li>
					<!-- <li>
						<a href="/">Politics</a>
					</li> -->
				</ul>
			</div>
		</div>

		<div class="right">
			<div class="subscribe-newsletter">
				<h1 class="text-xl font-medium capitalize">Subscribe to our news letter</h1>

				<p class="font-light text-sm max-w-96">
					Subscribe to our new's letter to get instant notifications of news, updates & jists.
				</p>

				<form action="" class="flex gap-2 h-max items-center mt-5 max-w-96">
					<Input class=" bg-white py-5 shadow-none" />

					<Button
						class="bg-transparent hover:bg-green-100/50 shadow-none border  text-slate-800 h-full"
					>
						Subscribe
					</Button>
				</form>
			</div>
			<div class="flex gap-5 items-center">
				<Twitter />

				<WhatsApp />
			</div>
		</div>
	</div>

	<Separator class="my-5 lg:my-10" />

	<span> &copy; Blog 99 2025, &reg; All Rights Reserved.</span>
</footer>

<style lang="postcss">
	footer {
		@apply bg-gray-300/30 px-4 pt-20 pb-10 lg:py-32 flex flex-col items-center w-full;
	}

	.footer-content {
		@apply mx-auto  grid sm:grid-cols-2 gap-8 lg:grid-cols-3;
	}

	.logo {
		@apply flex gap-3 items-center mb-5;
	}

	.logo > h1 {
		@apply text-2xl font-bold tracking-wider;
	}

	.logo > h1 > span {
		@apply text-green-900;
	}

	.middle {
		@apply flex flex-col gap-10 md:gap-14 sm:flex-row;
	}

	.links {
		@apply flex flex-col gap-3;
	}

	.links > h1 {
		@apply text-lg font-medium;
	}

	.links > ul {
		@apply flex flex-col gap-1;
	}

	.links > ul > li {
		@apply text-base font-normal;
	}

	.right {
		@apply flex flex-col gap-8 sm:mt-20 sm:col-span-2 lg:col-span-1 lg:mt-0 items-end;
	}

	.subscribe-newsletter {
		@apply flex flex-col gap-2;
	}

	footer > span {
		@apply text-stone-500 text-sm tracking-wide;
	}
</style>

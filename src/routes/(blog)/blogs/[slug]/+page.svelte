<script lang="ts">
	import BlogCard from '$lib/components/blog-card.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import BlogTitles from '$lib/components/ui/blog-titles/blog-titles.svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Separator } from '$lib/components/ui/separator';

	let simalar = [1, 2, 3, 4, 5, 6];
</script>

<section>
	<!-- BLOG BANNER IMAGE -->
	<header class="min-h-[450px]">
		<hgroup>
			<BlogTitles
				className="font-medium text-2xl md:text-4xl tracking-wide leading-relaxed text-center mb-8 md:mb-14"
				>Niger state government implements the new Minimum wage, and increases it to 80K</BlogTitles
			>

			<div class="author-card">
				<div>
					<Avatar.Root>
						<Avatar.Image src="/placeholder-author.png " alt="@blog9ja" />
						<Avatar.Fallback>b9ja</Avatar.Fallback>
					</Avatar.Root>

					<h2 class="font-medium">Ibn Maryam</h2>
				</div>

				<p class="text-sm font-medium text-slate-500">Posted: October 3 2024 • 2 min read</p>
			</div>
		</hgroup>
	</header>

	<!-- BLOG TABLE OF CONTENT & BLOG CONTENT -->

	<div class="blog-content-container">
		<aside>
			<h3>Table of Content</h3>

			<Separator />

			<ul>
				<li>
					<a href="#salary">Salary</a>
				</li>

				<li>
					<a href="#wage">New Minimun Wage</a>
				</li>

				<li>
					<a href="#wage">The State Government</a>
				</li>

				<li>
					<a href="#wage">Livelihood</a>
				</li>
			</ul>
		</aside>

		<div>
			<img src="/placeholder-image.avif" alt="Placeholder_Blog_Image" />
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate sint error optio
				assumenda, in incidunt doloremque nobis ad. Delectus nostrum cumque eum mollitia architecto
				rem earum voluptate aliquam molestias aspernatur culpa eius deserunt a, maiores quam cum
				fugiat quod sunt!
			</p>

			<h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, distinctio.</h1>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consectetur in, est ex
				expedita numquam sed asperiores eveniet? Ad sunt voluptatem mollitia sit modi possimus quod
				sed veniam at in vitae corrupti esse, delectus cupiditate dolorem nam sint repellat officiis
				soluta a. Vel laudantium ex nam, id omnis autem nisi ab odit optio nihil culpa architecto
				dolores consequatur corporis sunt obcaecati enim molestias eum repellendus?
			</p>

			<img src="/placeholder-image.avif" alt="Placeholder_Blog_Image" />

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi consectetur in, est ex
				expedita numquam sed asperiores eveniet? Ad sunt voluptatem mollitia sit modi possimus quod
				sed veniam at in vitae corrupti esse, delectus cupiditate dolorem nam sint repellat officiis
				soluta a. Vel laudantium ex nam, id omnis autem nisi ab odit optio nihil culpa architecto
				dolores consequatur corporis sunt obcaecati enim molestias eum repellendus?
			</p>

			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fuga praesentium nostrum enim
				ut! Sint delectus esse beatae magnam velit neque maiores voluptate voluptas? Rem error quasi
				hic dolore! Temporibus ipsa dicta consequatur nulla voluptatum officiis perspiciatis. Illo
				tempore vero debitis id quos provident. Placeat nesciunt nulla excepturi odit iure aperiam,
				optio blanditiis fuga impedit aliquid, qui, labore delectus modi at dicta itaque
				reprehenderit beatae natus velit ut accusamus totam? Saepe ex ducimus eum accusantium quae
				ea laborum iste! Dolorum minima, natus deleniti eveniet quis facilis qui. Ea, molestias
				doloribus! Natus, soluta. Provident est maxime totam distinctio libero debitis pariatur rem
				omnis! Laborum, reiciendis voluptatibus repellendus hic nisi necessitatibus esse officiis
				dolore eius at inventore cupiditate sapiente consectetur? Eaque, repellat.
			</p>
		</div>
	</div>

	<!-- SIMILAR ARTICLES -->

	<div class="similar-blogs-section">
		<BlogTitles>Similar Articles</BlogTitles>

		<!-- <div class="similar-blogs">
        </div> -->
		<Carousel.Root
			opts={{
				align: 'start'
			}}
			class="w-3/4 sm:w-5/6 xl:w-full"
		>
			<Carousel.Content class="gap-4">
				{#each simalar as blog, i}
					<Carousel.Item class="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 ">
						<div class="p-1">
							<BlogCard className="w-[263px] min-w-[253px]" id={blog * i} />
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col gap-10;
	}

	header {
		@apply flex items-center justify-center p-5 bg-slate-100/60;
	}

	.author-card {
		@apply flex items-center flex-col justify-center;
	}

	.author-card > div {
		@apply flex items-center gap-2 mb-3;
	}

	.blog-content-container {
		@apply flex flex-col sm:flex-row gap-5 lg:gap-10 w-full;
	}

	.blog-content-container > aside {
		@apply w-full sm:w-1/4 lg:w-1/5 flex flex-col gap-4 p-2;
	}

	.blog-content-container > aside h3 {
		@apply font-medium text-lg;
		font-family: 'Open Sans', sans-serif;
	}

	.blog-content-container > aside ul {
		@apply flex flex-col gap-1;
	}

	.blog-content-container > aside ul a {
		@apply font-normal text-sm text-slate-600 tracking-wide;
	}

	.blog-content-container > div {
		@apply flex-1 flex flex-col gap-5 p-3 bg-slate-100/50;

		& > img {
			@apply max-w-96 mx-auto my-10;
		}

		& h1 {
			@apply text-xl mt-5 tracking-wider font-medium text-justify leading-loose;
		}

		& p {
			@apply text-lg tracking-wider leading-loose;
		}
	}

	.similar-blogs-section {
		@apply mt-10 flex flex-col gap-4  w-full max-w-full items-center;
	}

	.similar-blogs {
		@apply flex gap-8 overflow-x-auto w-full max-w-full p-10 bg-slate-100/50;
	}
</style>

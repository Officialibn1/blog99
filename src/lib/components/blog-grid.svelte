<div class="flex-container h-[550px]">
	<div class="main-blog">
		<h1 class="text-2xl text-center my-auto">Main Blog Post</h1>
	</div>

	<div class="sub-blogs">
		<div>
			<h1 class="text-2xl text-center my-auto">Sub Blog Post</h1>
		</div>
		<div>
			<h1 class="text-2xl text-center my-auto">Sub Blog Post</h1>
		</div>
	</div>
</div>

<style lang="postcss">
	.flex-container {
		@apply flex w-full flex-col sm:flex-row gap-5  my-20;
	}

	.main-blog {
		@apply flex-1 bg-green-100/50 rounded-md  flex justify-center;
	}

	.sub-blogs {
		@apply flex gap-5 sm:w-2/5 lg:w-1/3 flex-col;
	}

	.sub-blogs > div {
		@apply flex-1 bg-red-100/50 rounded-md aspect-square sm:aspect-auto  flex justify-center;
	}
</style>

<script lang="ts">
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData, ActionData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createBlogFormSchema } from './schema';
	import {
		FormField,
		FormControl,
		FormLabel,
		FieldErrors,
		Button as FormButton,
		Description as FormDescription
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import Loader from '$lib/components/ui/icons/Loader.svelte';
	import Editor from '@toast-ui/editor';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { Separator } from '$lib/components/ui/separator';

	import {
		Root as SelectRoot,
		Trigger as SelectTrigger,
		Value as SelectValue,
		Content as SelectContent,
		Item as SelectItem
	} from '$lib/components/ui/select';
	import { toast } from 'svelte-sonner';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(createBlogFormSchema),
		applyAction: true,
		resetForm: true
	});

	const { form: formData, submitting } = form;

	const selectedTags = $derived(
		$formData.tags.map((tag) => ({
			label: data.tags.find((val) => val.id === tag)?.name,
			value: tag
		}))
	);

	const selectedCategory = $derived(
		$formData.category
			? {
					label: data.categories.find((val) => val.id === $formData.category)?.name,
					value: $formData.category
				}
			: {
					label: '',
					value: ''
				}
	);

	let editor: {
		reset(): unknown;
		destroy: () => any;
		getMarkdown: () => Promise<string>;
	};

	onMount(() => {
		editor = new Editor({
			el: document.querySelector('#editor'),
			height: '500px',
			initialEditType: 'markdown',
			previewStyle: 'tab'
		});

		editor;

		return () => editor.destroy();
	});

	const handleSubmit = async () => {
		let markdown = await editor?.getMarkdown();
		formData.update(
			($form) => {
				$form.content = markdown;

				return $form;
			},
			{ taint: false }
		);

		// editor.reset();
	};
</script>

<section>
	<hgroup>
		<h1>Write a New Blog</h1>
	</hgroup>

	<Separator class="mt-5 mb-10" />

	<div class="editor-container">
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						toast.success(`Blog Created successfully`);

						form.reset();
						editor.reset();
					} else if (result.type === 'error' || result.type === 'failure') {
						toast.error(`Failed to create blog!`);
					} else {
						toast.error(`Something went wrong!`);
					}
				};
			}}
			onsubmit={handleSubmit}
			enctype="multipart/form-data"
		>
			<div class="grid lg:grid-cols-2 gap-4 gap-x-5">
				<FormField {form} name="title">
					<FormControl let:attrs>
						<FormLabel>Blog Title</FormLabel>

						<Input
							class="shadow-none  bg-white rounded-sm"
							disabled={$submitting}
							aria-disabled={$submitting}
							{...attrs}
							bind:value={$formData.title}
						/>
					</FormControl>

					<FieldErrors />
				</FormField>

				<FormField {form} name="description">
					<FormControl let:attrs>
						<FormLabel>Blog Description</FormLabel>

						<Input
							class="shadow-none  bg-white rounded-sm"
							disabled={$submitting}
							aria-disabled={$submitting}
							{...attrs}
							bind:value={$formData.description}
						/>
					</FormControl>

					<FormDescription>
						Add a short description about the blog which will be used for a better SEO.
					</FormDescription>

					<FieldErrors />
				</FormField>

				<FormField {form} name="tags">
					<FormControl let:attrs>
						<FormLabel>Tags</FormLabel>

						<SelectRoot
							multiple
							selected={selectedTags}
							onSelectedChange={(s) => {
								if (s) {
									$formData.tags = s.map((v) => v.value);
								} else {
									$formData.tags = [];
								}
							}}
						>
							{#each $formData.tags as tag}
								<Input type="hidden" name={attrs.name} value={tag} />
							{/each}

							<SelectTrigger {...attrs} class=" bg-white shadow-none rounded-sm">
								<SelectValue placeholder="Select Tags" />
							</SelectTrigger>

							<SelectContent>
								{#each data.tags as tag}
									<SelectItem class="font-openSans" label={tag.name} value={tag.id} />
								{/each}
							</SelectContent>
						</SelectRoot>
					</FormControl>

					<FieldErrors />
				</FormField>

				<div class="grid gap-4 gap-x-5 lg:grid-cols-2">
					<FormField {form} name="category">
						<FormControl let:attrs>
							<FormLabel>Blog Category</FormLabel>

							<SelectRoot
								selected={selectedCategory}
								onSelectedChange={(s) => {
									s && ($formData.category = s.value);
								}}
							>
								<SelectTrigger {...attrs} class=" bg-white shadow-none rounded-sm">
									<SelectValue placeholder="Select Category" />
								</SelectTrigger>

								<SelectContent>
									{#each data.categories as category}
										<SelectItem class="font-openSans" label={category.name} value={category.id} />
									{/each}
								</SelectContent>
							</SelectRoot>

							<Input type="hidden" bind:value={$formData.category} name={attrs.name} />
						</FormControl>

						<FieldErrors />
					</FormField>

					<FormField {form} name="thumbNail">
						<FormControl let:attrs>
							<FormLabel>Blog Thumbnail</FormLabel>

							<Input
								{...attrs}
								type="file"
								accept=".jpg,.png,.jpeg,.webp"
								bind:value={$formData.thumbNail}
								class="shadow-none  bg-white rounded-sm"
							/>
						</FormControl>

						<FieldErrors />
					</FormField>
				</div>
			</div>

			<FormField {form} name="content" class="w-full overflow-x-auto">
				<FormControl let:attrs>
					<FormLabel>Blog Content</FormLabel>

					<div id="editor" class="shadow-none bg-white w-full"></div>

					<Input {...attrs} type="hidden" bind:value={$formData.content} />
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormField {form} name="published">
				<FormControl let:attrs>
					<div class="flex gap-3 items-center">
						<FormLabel>Published</FormLabel>

						<Switch
							disabled={$submitting}
							aria-disabled={$submitting}
							includeInput
							{...attrs}
							bind:checked={$formData.published}
						/>
					</div>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormButton disabled={$submitting} aria-disabled={$submitting} class="max-w-xs">
				{#if $submitting}
					<Loader />
				{:else}
					Create Blog
				{/if}
			</FormButton>
		</form>
	</div>

	<!-- <div id="editor" style="outline"></div> -->
</section>

<style lang="postcss">
	section {
		@apply w-full h-full;

		& hgroup {
			/* @apply; */

			& h1 {
				@apply text-2xl font-medium font-openSans;
			}
		}
	}

	.editor-container {
		@apply flex;

		& form {
			@apply flex flex-col gap-4 w-full;
		}
	}
</style>

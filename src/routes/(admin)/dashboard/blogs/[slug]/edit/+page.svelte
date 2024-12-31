<script lang="ts">
	import '@toast-ui/editor/dist/toastui-editor.css';
	import { superForm, superValidate } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { editBlogFormSchema } from './schema';
	import {
		FormField,
		FormControl,
		FormLabel,
		FieldErrors,
		FormButton
	} from '$lib/components/ui/form';
	import {
		Root as SelectRoot,
		Trigger as SelectTrigger,
		Value as SelectValue,
		Content as SelectContent,
		Item as SelectItem
	} from '$lib/components/ui/select';
	import Loader from '$lib/components/ui/icons/Loader.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Input } from '$lib/components/ui/input';
	import { applyAction, enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { Switch } from '$lib/components/ui/switch';
	import Editor from '@toast-ui/editor';
	import { onMount } from 'svelte';

	let editor: {
		reset(): unknown;
		destroy: () => any;
		getMarkdown: () => Promise<string>;
	};

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	let submitting = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(editBlogFormSchema)
	});

	const { form: formData } = form;

	onMount(() => {
		editor = new Editor({
			el: document.getElementById('editor'),
			initialEditType: 'markdown',
			height: '500px',
			previewStyle: 'tab',
			initialValue: $formData.content
		});

		return () => editor.destroy();
	});

	const selectedTags = $derived(
		$formData.tags.map((tag) => {
			return {
				label: data.tags.find((val) => val.id === tag)?.name,
				value: tag
			};
		})
	);

	const selectedCategory = $derived(
		$formData.category
			? {
					label: data.categories.find((cat) => cat.id === $formData.category)?.name,
					value: $formData.category
				}
			: {
					label: '',
					value: ''
				}
	);

	const handleSubmit = async () => {
		let markdown = await editor.getMarkdown();

		formData.update(
			($form) => {
				$form.content = markdown;

				return $form;
			},
			{ taint: false }
		);
	};
</script>

<section>
	<hgroup>
		<h1>Edit Blog</h1>
	</hgroup>

	<Separator class="mt-5 mb-10" />

	<div class="editor-container">
		<form
			method="POST"
			onsubmit={handleSubmit}
			use:enhance={async ({ formData: submittedFormData, cancel }) => {
				submitting = true;

				const submittedForm = await superValidate(submittedFormData, zod(editBlogFormSchema));

				if (!submittedForm.valid) {
					submitting = false;

					applyAction({
						type: 'failure',
						status: 400,
						data: {
							form: submittedForm
						}
					});

					toast.error(`Invalid Form Fields, failed to edit blog!`);

					cancel();

					return;
				}

				return async ({ result, update }) => {
					if (result.type === 'success') {
						toast.success(`Blog edited successfully`);

						form.reset();
						submitting = false;
						editor.reset();
						submitting = false;
						window.history.back();
					} else if (result.type === 'error') {
						toast.error(`Error while editting blog!`);

						applyAction({
							type: 'failure',
							status: 400,
							data: {
								form: submittedForm
							}
						});
						submitting = false;
					} else if (result.type === 'failure') {
						console.log(result.data);

						if (result.data?.message) {
							toast.error(result.data.message as string);
						} else {
							toast.error(`Failed to edit blog.`);
						}

						applyAction({
							type: 'failure',
							status: 400,
							data: {
								form: submittedForm
							}
						});
						submitting = false;
					} else {
						submitting = false;

						update();
					}
				};
			}}
			enctype="multipart/form-data"
		>
			<div class="grid lg:grid-cols-2 gap-4 gap-x-5">
				<FormField {form} name="title">
					<FormControl let:attrs>
						<FormLabel>Blog Title</FormLabel>

						<Input
							class="shadow-none  bg-white rounded-sm"
							disabled={submitting}
							aria-disabled={submitting}
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
							disabled={submitting}
							aria-disabled={submitting}
							{...attrs}
							bind:value={$formData.description}
						/>
					</FormControl>

					<!-- <FormDescription>
						Add a short description about the blog which will be used for a better SEO.
					</FormDescription> -->

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
								accept=".jpg,.png,.jpeg,.webp,.avif"
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
							disabled={submitting}
							aria-disabled={submitting}
							includeInput
							{...attrs}
							bind:checked={$formData.published}
						/>
					</div>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormButton disabled={submitting} aria-disabled={submitting} class="max-w-xs">
				{#if submitting}
					<Loader />
				{:else}
					Edit Blog
				{/if}
			</FormButton>
		</form>
	</div>
</section>

<style lang="postcss">
	section {
		@apply w-full h-full;

		& hgroup {
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

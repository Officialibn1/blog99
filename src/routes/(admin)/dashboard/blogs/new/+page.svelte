<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData, ActionData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createBlogFormSchema } from './schema';
	import {
		FormField,
		FormControl,
		FormLabel,
		FieldErrors,
		Button as FormButton
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import Loader from '$lib/components/ui/icons/Loader.svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { Separator } from '$lib/components/ui/separator';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form: formAction }: Props = $props();

	// console.log('Form Action: ', formAction);

	const form = superForm(data.form, {
		validators: zodClient(createBlogFormSchema),
		applyAction: true
	});

	const { form: formData, submitting, errors } = form;

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
			previewStyle: 'vertical'
		});

		editor;

		return () => editor.destroy();
	});

	const handleSubmit = async () => {
		let markdown = await editor?.getMarkdown();
		await formData.update(
			($form) => {
				$form.content = markdown;

				return $form;
			},
			{ taint: false }
		);

		editor.reset();

		console.log('Markdown Content: ', markdown);
	};
</script>

<section>
	<hgroup>
		<h1>Write New Blog</h1>
	</hgroup>

	<Separator class="mt-5 mb-10" />

	<div class="editor-container">
		<form method="POST" use:enhance onsubmit={handleSubmit}>
			<FormField {form} name="title">
				<FormControl let:attrs>
					<FormLabel>Blog Title</FormLabel>

					<Input
						class="shadow-none max-w-xl bg-white"
						disabled={$submitting}
						aria-disabled={$submitting}
						{...attrs}
						bind:value={$formData.title}
					/>
				</FormControl>

				<FieldErrors />
			</FormField>

			<!-- <FormField {form} name="slug">
				<FormControl let:attrs>
					<FormLabel>Slug</FormLabel>

					<Input
						class="shadow-none max-w-xl bg-white"
						disabled={$submitting}
						bind:value={$formData.slug}
						aria-disabled={$submitting}
						{...attrs}
					/>
				</FormControl>

				<FieldErrors />
			</FormField> -->

			<FormField {form} name="content">
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

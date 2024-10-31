<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
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
	import { Textarea } from '$lib/components/ui/textarea';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
	import { onMount } from 'svelte';

	const { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(createBlogFormSchema)
	});

	const { form: formData, submitting, errors, enhance } = form;

	onMount(() => {
		const editor = new Editor({
			el: document.querySelector('#editor'),
			height: '500px',
			initialEditType: 'markdown',
			previewStyle: 'vertical'
		});

		editor.getMarkdown();
	});
</script>

<section>
	<hgroup>
		<h1>Create a new Blog</h1>
	</hgroup>

	<div class="editor-container">
		<form method="POST" use:enhance>
			<FormField {form} name="title">
				<FormControl let:attrs>
					<FormLabel>Blog Title</FormLabel>

					<Input
						class="shadow-none bg-white"
						disabled={$submitting}
						aria-disabled={$submitting}
						{...attrs}
						bind:value={$formData.title}
					/>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormField {form} name="slug">
				<FormControl let:attrs>
					<FormLabel>Slug</FormLabel>

					<Input
						class="shadow-none bg-white"
						disabled={$submitting}
						aria-disabled={$submitting}
						{...attrs}
						bind:value={$formData.slug}
					/>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormField {form} name="content">
				<FormControl>
					<FormLabel>Blog Content</FormLabel>

					<div id="editor" class="shadow-none bg-white"></div>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormField {form} name="published">
				<FormControl let:attrs>
					<FormLabel>Published</FormLabel>

					<Switch
						disabled={$submitting}
						aria-disabled={$submitting}
						includeInput
						{...attrs}
						bind:checked={$formData.published}
					/>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormButton disabled={$submitting} aria-disabled={$submitting}>
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

		& h1 {
			@apply text-3xl;
		}
	}
</style>

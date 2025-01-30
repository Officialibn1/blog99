<script lang="ts">
	import BlogTitles from '$lib/components/ui/blog-titles/blog-titles.svelte';
	import { Button } from '$lib/components/ui/button';
	import Twitter from '$lib/components/ui/icons/Twitter.svelte';
	import WhatsApp from '$lib/components/ui/icons/WhatsApp.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { contactFormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import { Textarea } from '$lib/components/ui/textarea';
	import Facebook from '$lib/components/ui/icons/Facebook.svelte';
	import Loader from '$lib/components/ui/icons/Loader.svelte';
	import { Separator } from '$lib/components/ui/separator';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(contactFormSchema)
	});

	const { form: formData, enhance, submitting, errors } = form;
</script>

<section>
	<header class="min-h-[450px]">
		<hgroup>
			<BlogTitles
				className="font-medium text-2xl md:text-4xl tracking-wide leading-relaxed text-center mb-8 md:mb-14"
				>Contact Us</BlogTitles
			>

			<p class="text-base font-light text-center text-slate-500 lg:w-2/3 mx-auto">
				Reach out to us on enquireis about blog's, contents and articles we write. If you think a
				content is inappropriate please do not hesitate to reach out to use with you canplains about
				the content, thank you.
			</p>

			<div class="social-container">
				<a href="/">
					<WhatsApp />
				</a>

				<a href="/">
					<Twitter />
				</a>

				<a href="/">
					<Facebook />
				</a>
			</div>
		</hgroup>
	</header>

	<Separator class="mb-10" />

	<div>
		<form method="POST" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control let:attrs>
					<Form.Label>Full Name</Form.Label>

					<Input disabled={$submitting} {...attrs} bind:value={$formData.name} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>

					<Input disabled={$submitting} {...attrs} bind:value={$formData.email} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>

					<Input disabled={$submitting} {...attrs} bind:value={$formData.email} />
				</Form.Control>

				<Form.Description>Whats your reason(s) for reaching out?</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>

					<Textarea disabled={$submitting} {...attrs} bind:value={$formData.email} />
				</Form.Control>

				<Form.Description>Please describe your reason(s) in more details!</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Button class="mt-5 md:w-1/3 md:ml-auto" disabled={$submitting}>
				{#if $submitting}
					<Loader />
				{:else}
					Submit
				{/if}
			</Form.Button>
		</form>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col gap-10;

		& div:nth-child(2) {
			@apply w-full lg:w-2/3 mx-auto my-10 lg:my-14 xl:my-24;

			& form {
				@apply flex flex-col gap-2;
			}
		}
	}

	header {
		@apply flex items-center justify-center p-5;
	}

	.social-container {
		@apply hidden md:flex items-center gap-5 justify-center mt-8;
	}
</style>

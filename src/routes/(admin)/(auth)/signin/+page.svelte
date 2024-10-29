<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInFormSchema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import Loader from '$lib/components/ui/icons/Loader.svelte';

	const { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(signInFormSchema)
	});

	const { form: formData, errors, submitting, enhance } = form;
</script>

<section>
	<hgroup>
		<div>
			<h1>Blog <span>9ja</span> Admin</h1>
		</div>
	</hgroup>

	<form method="POST" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>

				<Input
					{...attrs}
					bind:value={$formData.email}
					disabled={$submitting}
					aria-disabled={$submitting}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>

				<Input
					{...attrs}
					bind:value={$formData.password}
					type="password"
					disabled={$submitting}
					aria-disabled={$submitting}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Button disabled={$submitting} aria-disabled={$submitting}>
			{#if $submitting}
				<Loader />
			{:else}
				Sign In
			{/if}
		</Form.Button>
	</form>
</section>

<style lang="postcss">
	section {
		@apply w-full flex flex-col justify-center py-24 pt-36  gap-10 px-4;

		& hgroup {
			@apply flex flex-col w-fit mx-auto gap-8 md:mt-20;

			& > div h1 {
				@apply font-bold text-3xl tracking-widest text-center;

				& span {
					@apply text-green-700;
				}
			}
		}

		& form {
			@apply flex flex-col gap-5 md:w-96  mx-auto;
		}
	}
</style>

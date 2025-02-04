<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signInFormSchema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import Loader from '$lib/components/ui/icons/Loader.svelte';
	import { Eye, EyeClosed } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	const { data }: { data: PageData } = $props();

	let showPassword = $state(false);

	const form = superForm(data.form, {
		validators: zodClient(signInFormSchema)
	});

	const { form: formData, errors, submitting, enhance } = form;
</script>

<section>
	<hgroup>
		<div>
			<h1>Blog <a href="/">99</a> Admin</h1>
		</div>
	</hgroup>

	<form method="POST" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>

				<Input
					class="shadow-none"
					{...attrs}
					bind:value={$formData.email}
					disabled={$submitting}
					aria-disabled={$submitting}
				/>
			</Form.Control>

			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="password" class="relative">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>

				<div class="flex relative">
					<Input
						class="rounded-sm shadow-none bg-white"
						{...attrs}
						bind:value={$formData.password}
						type={!showPassword ? 'password' : 'text'}
						disabled={$submitting}
						aria-disabled={$submitting}
					/>

					<button
						type="button"
						class="absolute right-0 bottom-2 cursor-pointer hover:bg-transparent px-2"
						onclick={() => (showPassword = !showPassword)}
					>
						{#if showPassword}
							<Eye color={'#4b5563'} size={16} />
						{:else}
							<EyeClosed color={'#4b5563'} size={16} />
						{/if}
					</button>
				</div>
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

				& a {
					@apply text-orange-700 hover:underline;
				}
			}
		}

		& form {
			@apply flex flex-col gap-5 md:w-96  mx-auto;
		}

		/* .password-toggle-container {
			@apply ;
		} */
	}
</style>

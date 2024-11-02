<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { superForm } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { passwordSettingsSchema } from './schema';
	import {
		FormField,
		FieldErrors,
		FormControl,
		FormButton,
		Description,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import Loader from '$lib/components/ui/icons/Loader.svelte';

	type Props = {
		data: PageData;
		form: ActionData;
	};
	const { data }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(passwordSettingsSchema)
	});

	const { form: formData, submitting, enhance } = form;

	const showPassword = $state(false);
</script>

<section>
	<hgroup>
		<h1>Security Settings</h1>

		<p>Your Profile and Bio details can be viewed and edited here.</p>
	</hgroup>

	<Separator class="mb-5" />

	<div>
		<form method="POST" use:enhance>
			<FormField {form} name="newPassword">
				<FormControl let:attrs>
					<FormLabel>New Password</FormLabel>

					<Input
						class="shadow-none rounded-sm bg-white"
						{...attrs}
						bind:value={$formData.newPassword}
						type={!showPassword ? 'password' : 'text'}
						disabled={$submitting}
						aria-disabled={$submitting}
					/>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormField {form} name="comfirmNewPassword">
				<FormControl let:attrs>
					<FormLabel>Confirm New Password</FormLabel>

					<Input
						class="shadow-none rounded-sm bg-white"
						{...attrs}
						bind:value={$formData.comfirmNewPassword}
						type={!showPassword ? 'password' : 'text'}
						disabled={$submitting}
						aria-disabled={$submitting}
					/>
				</FormControl>

				<FieldErrors />
			</FormField>

			<FormButton
				disabled={$submitting}
				aria-disabled={$submitting}
				class="mt-8 max-w-xs rounded-sm"
			>
				{#if $submitting}
					<Loader />
				{:else}
					Create Password
				{/if}
			</FormButton>
		</form>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col gap-3;

		& hgroup {
			@apply flex flex-col gap-1;

			& h1 {
				@apply font-semibold font-openSans text-2xl tracking-wide;
			}

			& p {
				@apply text-sm font-medium font-openSans text-gray-500 tracking-wide;
			}
		}

		& form {
			@apply flex flex-col gap-2;
		}
	}
</style>

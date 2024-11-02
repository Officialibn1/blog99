<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { superForm } from 'sveltekit-superforms';
	import {
		FormField,
		FieldErrors,
		FormControl,
		FormLabel,
		FormButton,
		Description
	} from '$lib/components/ui/form';

	import type { ActionData, PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { profileSettingsFormSchema } from './schema';
	import { Input } from '$lib/components/ui/input';
	import Loader from '$lib/components/ui/icons/Loader.svelte';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(profileSettingsFormSchema)
	});

	const { form: formData, submitting, enhance } = form;
</script>

<section>
	<hgroup>
		<h1>Profile</h1>

		<p>Your Profile and Bio details can be viewed and edited here.</p>
	</hgroup>

	<Separator class="mb-5" />

	<div>
		<form method="POST" use:enhance>
			<FormField {form} name="name">
				<FormControl let:attrs>
					<FormLabel>Name</FormLabel>

					<Input
						class="shadow-none rounded-sm bg-white max-w-lg"
						{...attrs}
						type="text"
						name="name"
						bind:value={$formData.name}
						disabled={$submitting}
						aria-disabled={$submitting}
					/>
				</FormControl>

				<FieldErrors />

				<Description class="text-xs"
					>This is your public display name. It must be your real name. You can only change this
					once every 30 days.</Description
				>
			</FormField>

			<FormField {form} name="username">
				<FormControl let:attrs>
					<FormLabel>Username</FormLabel>

					<Input
						class="shadow-none rounded-sm bg-white max-w-lg"
						{...attrs}
						type="text"
						name="username"
						bind:value={$formData.username}
						disabled={$submitting}
						aria-disabled={$submitting}
					/>
				</FormControl>

				<FieldErrors />

				<Description class="text-xs"
					>You can manage verified email addresses here, but once change must be verified again.</Description
				>
			</FormField>

			<FormField {form} name="email">
				<FormControl let:attrs>
					<FormLabel>Email</FormLabel>

					<Input
						class="shadow-none rounded-sm bg-white max-w-lg"
						{...attrs}
						type="email"
						name="email"
						bind:value={$formData.email}
						disabled={$submitting}
						aria-disabled={$submitting}
					/>
				</FormControl>

				<FieldErrors />

				<Description class="text-xs"
					>This is your public display name. It can be your real name or a pseudonym. You can only
					change this once every 30 days.</Description
				>
			</FormField>

			<FormButton
				disabled={$submitting}
				aria-disabled={$submitting}
				class="mt-8 max-w-xs rounded-sm"
			>
				{#if $submitting}
					<Loader />
				{:else}
					Update Profile
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

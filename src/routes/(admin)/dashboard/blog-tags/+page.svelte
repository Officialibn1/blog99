<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { ActionData, PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { blogTagsSchema } from './schema';

	import {
		FormField,
		FormControl,
		FormLabel,
		FieldErrors,
		FormButton
	} from '$lib/components/ui/form';

	import { Root as DialogRoot, Trigger, Content, Header, Title } from '$lib/components/ui/dialog';

	import {
		Root as TableRoot,
		Header as TableHeader,
		Row as TableRow,
		Head as TableHead,
		Body as TableBody,
		Cell as TableCell
	} from '$lib/components/ui/table';

	import { createTable, createRender, Render, Subscribe } from 'svelte-headless-table';

	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';

	import { Input } from '$lib/components/ui/input';
	import Loader from '$lib/components/ui/icons/Loader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { readable } from 'svelte/store';
	import { formatdate } from '$lib/utils';
	import TagsTableActions from './tags-table-actions.svelte';
	import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { invalidate } from '$app/navigation';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	const { data, form: formActionData }: Props = $props();

	$effect(() => {
		if (formActionData?.success) {
			invalidate(`tags:PageData`);
		}
	});

	const form = superForm(data.form, {
		validators: zodClient(blogTagsSchema)
	});

	const { form: formData, submitting, enhance } = form;

	const table = createTable(readable(data.tags), {
		page: addPagination({
			initialPageSize: 8
		}),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'Tag ID',
			cell: ({ value }) => {
				return `${value}`;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'name',
			header: 'Tag Name'
		}),
		table.column({
			accessor: 'blogsIds',
			header: 'Blogs with Tag',
			cell: ({ value }) => {
				return value.length;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'createdAt',
			header: 'Created At',
			cell: ({ value }) => {
				return formatdate(value);
			}
		}),
		// @ts-expect-error
		table.column({
			// @ts-expect-error
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				// @ts-expect-error
				return createRender(TagsTableActions, { id: value });
			},
			plugins: {
				sort: {
					disabled: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { filterValue } = pluginStates.filter;

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;

	const pageCountArray = $derived(Array.from({ length: $pageCount }, (_, index) => index));
</script>

<section>
	<hgroup>
		<DialogRoot>
			<Trigger class="ml-auto">
				<Button class="font-openSans shadow-none rounded-sm ml-auto " variant="outline"
					>New Tag</Button
				>
			</Trigger>

			<Content class="font-openSans">
				<Header>
					<Title>Create New Tag</Title>
				</Header>

				<div>
					<form method="POST" use:enhance action="?/addTag">
						<FormField {form} name="name">
							<FormControl let:attrs>
								<FormLabel>Tag Name</FormLabel>

								<Input
									{...attrs}
									bind:value={$formData.name}
									class="shadow-none rounded-sm bg-white"
									type="text"
									disabled={$submitting}
									aria-disabled={$submitting}
								/>
							</FormControl>

							<FieldErrors />
						</FormField>

						<FormButton disabled={$submitting} aria-disabled={$submitting} class="ml-auto">
							{#if $submitting}
								<Loader />
							{:else}
								Create
							{/if}
						</FormButton>
					</form>
				</div>
			</Content>
		</DialogRoot>

		<Input
			bind:value={$filterValue}
			class="max-w-lg shadow-none rounded-sm bg-white mx-auto"
			placeholder="Filter tags by name..."
		/>
	</hgroup>

	<div class="table-container">
		<TableRoot {...$tableAttrs}>
			<TableHeader class="bg-white">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<TableRow>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<TableHead>
										<div>
											{#if cell.id === 'name' || cell.id === 'createdAt'}
												<Button variant="ghost" onclick={props.sort.toggle}>
													<Render of={cell.render()} />

													<ArrowUpDown class="ml-2 h-4 w-4" />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</div>
									</TableHead>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableHeader>

			<TableBody {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<TableRow {...rowAttrs} class="even:bg-slate-200/50">
							{#each row.cells as cell}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<TableCell {...attrs}>
										<div class="ml-4">
											<Render of={cell.render()} />
										</div>
									</TableCell>
								</Subscribe>
							{/each}
						</TableRow>
					</Subscribe>
				{/each}
			</TableBody>
		</TableRoot>

		{#if data.tags.length === 0}
			<h1 class="text-3xl font-medium text-center mt-5">There are no tags</h1>
		{/if}
	</div>

	<div class="pagination-container">
		<Button
			variant="outline"
			size="icon"
			onclick={() => {
				hasPreviousPage && ($pageIndex = $pageIndex - 1);
			}}
			disabled={!$hasPreviousPage}
		>
			<ChevronLeft />
		</Button>

		<div>
			{#each pageCountArray as page (page)}
				<Button
					size="icon"
					variant={$pageIndex === page ? 'outline' : 'secondary'}
					onclick={() => ($pageIndex = page)}
				>
					{page + 1}
				</Button>
			{/each}
		</div>
		<Button
			variant="outline"
			size="icon"
			onclick={() => {
				hasNextPage && ($pageIndex = $pageIndex + 1);
			}}
			disabled={!$hasNextPage}
		>
			<ChevronRight />
		</Button>
	</div>
</section>

<style lang="postcss">
	section {
		@apply flex flex-col gap-3 w-full;

		& hgroup {
			@apply w-full flex flex-col relative gap-5;
		}
	}

	form {
		@apply flex flex-col gap-3;
	}

	.table-container {
		@apply mt-5;
	}

	.pagination-container {
		@apply flex gap-5 justify-end mt-20;

		& > div {
			@apply flex gap-2 items-center;
		}
	}
</style>

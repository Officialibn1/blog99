<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { categorySchema } from './schema';

	import {
		FormField,
		FormControl,
		FormLabel,
		FieldErrors,
		Button as FormButton
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
	import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import CategoriesTableActions from './categories-table-actions.svelte';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();

	// console.log(data.categories);

	const form = superForm(data.form, {
		validators: zodClient(categorySchema)
	});

	const { form: formData, enhance, submitting } = form;

	const table = createTable(readable(data.categories), {
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
			header: 'Category ID',
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
			header: 'Name'
		}),
		table.column({
			accessor: 'blogs',
			header: 'Blogs With Categories',
			cell: ({ value }) => {
				return value.length;
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				// @ts-expect-error
				return createRender(CategoriesTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true
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
				<Button variant="outline" class="font-openSans shadow-none rounded-sm ml-auto ">
					New Category
				</Button>

				<Content class="font-openSans">
					<Header>
						<Title>Create New Category</Title>
					</Header>

					<div>
						<form method="POST" use:enhance action="?/addCategory">
							<FormField {form} name="name">
								<FormControl let:attrs>
									<FormLabel>Category Name</FormLabel>
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
			</Trigger>
		</DialogRoot>

		<Input
			bind:value={$filterValue}
			class="max-w-lg shadow-none rounded-sm bg-white mx-auto"
			placeholder="Filter categories by name..."
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

		{#if data.categories.length === 0}
			<h1 class="text-3xl font-medium text-center mt-5">There are no categories</h1>
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

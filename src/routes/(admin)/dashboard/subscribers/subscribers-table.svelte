<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { createTable, createRender, Subscribe, Render } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { subscribers } from '$lib/dummy-datas/subscribers';
	import SubscribersTableActions from './subscribers-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpDown } from 'lucide-svelte';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { Input } from '$lib/components/ui/input';
	import TableBadge from '$lib/components/table-badge.svelte';

	const table = createTable(readable(subscribers), {
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
			header: '',
			cell: ({ value }) => {
				return `${value}.`;
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
			header: 'Name'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'blocked',
			header: 'Blocked',
			cell: ({ value }) => {
				return value
					? // @ts-expect-error
						createRender(TableBadge, {
							title: 'Blocked',
							className: 'bg-red-400/50 text-red-900 pointer-events-none',
							variant: 'secondary'
						})
					: // @ts-expect-error
						createRender(TableBadge, {
							title: 'Active',
							className: 'bg-green-400/50 text-green-900 pointer-events-none',
							variant: 'secondary'
						});
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
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				// @ts-expect-error
				return createRender(SubscribersTableActions, { id: value });
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

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;

	const { filterValue } = pluginStates.filter;

	const pageCountArray = $derived(Array.from({ length: $pageCount }, (_, index) => index));
</script>

<section>
	<div class="search-filter-container">
		<Input
			bind:value={$filterValue}
			placeholder="Filter Subscriber by Name or Email..."
			type="text"
			class="bg-white shadow-none rounded-sm max-w-md mx-auto"
		/>
	</div>

	<div class="table-container">
		<Table.Root {...$tableAttrs}>
			<Table.Header class="bg-white ">
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										<div
											class={cell.id === 'name' || cell.id === 'email'
												? 'text-start font-openSans'
												: 'font-openSans'}
										>
											{#if cell.id === 'name' || cell.id === 'email'}
												<Button variant="ghost" onclick={props.sort.toggle}>
													<Render of={cell.render()} />

													<ArrowUpDown class="ml-2 h-4 w-4" />
												</Button>
											{:else}
												<Render of={cell.render()} />
											{/if}
										</div>
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>

			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} class="even:bg-slate-200/50 ">
							{#each row.cells as cell}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<div class="pagination-container">
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasPreviousPage}
			onclick={() => ($pageIndex = $pageIndex - 1)}>Previous Page</Button
		>

		<div>
			{#each pageCountArray as page (page)}
				<Button
					size="icon"
					variant={page === $pageIndex ? 'outline' : 'secondary'}
					onclick={() => ($pageIndex = page)}
				>
					{page}
				</Button>
			{/each}
		</div>

		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			onclick={() => ($pageIndex = $pageIndex + 1)}>Next Page</Button
		>
	</div>
</section>

<style lang="postcss">
	section {
		@apply mt-10 flex flex-col gap-5;
	}

	.table-container {
		@apply mt-5;
	}

	.pagination-container {
		@apply flex gap-10 justify-end mt-20;

		& > div {
			@apply flex gap-2 items-center;
		}
	}
</style>
